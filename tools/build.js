#!/usr/bin/env node

/**
 * tools/build.js
 * Dual-Variant Production Build Pipeline for Andrew Strachan's Electronic Career Portfolio.
 * Generates:
 * 1. dist/public/  - Sanitized build for public GitHub Pages (redacted phone, logins, private links)
 * 2. dist/private/ - Unredacted build for authorized evaluation & Firebase Hosting
 *
 * Adheres to: ORIGINAL_REQUEST.md §R3, PROJECT.md §Feature 12 & §Interface Contracts.
 *
 * Usage:
 *   node tools/build.js                   # Builds both variants
 *   node tools/build.js --variant=public  # Builds public variant only
 *   node tools/build.js --variant=private # Builds private variant only
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_PUBLIC = path.join(DIST_DIR, 'public');
const DIST_PRIVATE = path.join(DIST_DIR, 'private');

// Parse command line arguments
const args = process.argv.slice(2);
let targetVariant = 'all';

for (const arg of args) {
  if (arg.startsWith('--variant=')) {
    const val = arg.split('=')[1].toLowerCase();
    if (val === 'public' || val === 'private' || val === 'all') {
      targetVariant = val;
    } else {
      console.error(`[ERROR] Unrecognized variant: ${val}. Must be 'public', 'private', or 'all'.`);
      process.exit(1);
    }
  }
}

// Source directories and files to bundle
const SOURCE_ENTRIES = [
  { type: 'file', path: 'index.html' },
  { type: 'file', path: 'README.md' },
  { type: 'file', path: '.nojekyll' },
  { type: 'dir', path: 'styles' },
  { type: 'dir', path: 'js' },
  { type: 'dir', path: 'data' },
  { type: 'dir', path: 'assets' }
];

/**
 * Validates that all critical source files exist before building
 */
function verifySourcePaths() {
  if (!fs.existsSync(ROOT_DIR)) {
    throw new Error(`Root directory does not exist: ${ROOT_DIR}`);
  }

  for (const entry of SOURCE_ENTRIES) {
    const fullPath = path.join(ROOT_DIR, entry.path);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Required source missing: ${entry.path} (${fullPath})`);
    }
    const stat = fs.statSync(fullPath);
    if (entry.type === 'dir' && !stat.isDirectory()) {
      throw new Error(`Expected directory: ${entry.path}`);
    }
    if (entry.type === 'file' && !stat.isFile()) {
      throw new Error(`Expected file: ${entry.path}`);
    }
  }
}

/**
 * Sanitizes content for the public distribution
 */
function sanitizePublicContent(content, filePath) {
  let sanitized = content;

  // 1. Sanitize phone numbers (e.g. 228-224-7445, (228) 224-7445)
  // Guard against year ranges like 2024-2025
  const phoneRegex = /\b(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  sanitized = sanitized.replace(phoneRegex, (match) => {
    if (/^\d{4}-\d{4}$/.test(match)) return match;
    return '[REDACTED]';
  });

  // 2. Sanitize test credentials (z@z.com / zzzzzz)
  sanitized = sanitized.replace(/z@z\.com/g, '[REDACTED]');
  sanitized = sanitized.replace(/zzzzzz/g, '[REDACTED]');

  // 3. Sanitize unwhitelisted personal emails, preserving strachan@uab.edu
  sanitized = sanitized.replace(/\b[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com\b/gi, 'strachan@uab.edu');

  // 4. In public build config files, ensure isPublic: true, redacted: true, showTestLogins: false, phone: undefined
  if (filePath.endsWith('config.js')) {
    sanitized = sanitized.replace(/variant:\s*['"]private['"]/g, "variant: 'public'");
    sanitized = sanitized.replace(/redacted:\s*false/g, 'redacted: true');
    sanitized = sanitized.replace(/isPublic:\s*false/g, 'isPublic: true');
    sanitized = sanitized.replace(/showTestLogins:\s*true/g, 'showTestLogins: false');
    // Ensure ghsLogin object is stripped from public config
    sanitized = sanitized.replace(/ghsLogin:\s*\{[\s\S]*?\}/g, 'ghsLogin: undefined');
  }

  // 5. Replace restricted demo video clips with public poster placeholders
  if (filePath.endsWith('index.html') || filePath.endsWith('projects.json')) {
    sanitized = sanitized.replace(/assets\/previews\/ghs-v1-10s-720p\.mp4/g, 'assets/previews/ghs-v1-poster.png');
    sanitized = sanitized.replace(/assets\/previews\/ghs\.mp4/g, 'assets/previews/ghs-poster.png');
  }

  return sanitized;
}

/**
 * Prepares content for the private distribution
 */
function preparePrivateContent(content, filePath) {
  let output = content;

  if (filePath.endsWith('config.js')) {
    output = output.replace(/variant:\s*['"]public['"]/g, "variant: 'private'");
    output = output.replace(/redacted:\s*true/g, 'redacted: false');
    output = output.replace(/isPublic:\s*true/g, 'isPublic: false');
    output = output.replace(/showTestLogins:\s*false/g, 'showTestLogins: true');
  }

  return output;
}

/**
 * Recursively copies a directory tree, transforming text files based on variant
 */
function copyDirectory(srcDir, destDir, variant) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    // Exclude system files and internal agent workspaces
    if (entry.name === '.DS_Store' || entry.name === '.git' || entry.name === '.agents') {
      continue;
    }

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, variant);
    } else if (entry.isFile()) {
      const isText = /\.(html|js|json|css|md|txt|svg)$/i.test(entry.name);
      if (isText) {
        const raw = fs.readFileSync(srcPath, 'utf8');
        const processed = variant === 'public'
          ? sanitizePublicContent(raw, srcPath)
          : preparePrivateContent(raw, srcPath);
        fs.writeFileSync(destPath, processed, 'utf8');
      } else {
        // Binary asset (images, videos, PDF documents, fonts)
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

/**
 * Builds a specific target distribution variant
 */
function buildVariant(variant) {
  const destDir = variant === 'public' ? DIST_PUBLIC : DIST_PRIVATE;
  console.log(`\n--- Building [${variant.toUpperCase()}] Variant -> ${destDir} ---`);

  // Ensure clean destination folder while preserving .git repository metadata if present
  if (fs.existsSync(destDir)) {
    const gitDir = path.join(destDir, '.git');
    const hasGit = fs.existsSync(gitDir);
    if (hasGit) {
      const items = fs.readdirSync(destDir);
      for (const item of items) {
        if (item === '.git') continue;
        fs.rmSync(path.join(destDir, item), { recursive: true, force: true });
      }
    } else {
      fs.rmSync(destDir, { recursive: true, force: true });
      fs.mkdirSync(destDir, { recursive: true });
    }
  } else {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 1. Copy and transform index.html
  const indexSrc = path.join(ROOT_DIR, 'index.html');
  const indexDest = path.join(destDir, 'index.html');
  const rawHtml = fs.readFileSync(indexSrc, 'utf8');
  const transformedHtml = variant === 'public'
    ? sanitizePublicContent(rawHtml, indexSrc)
    : preparePrivateContent(rawHtml, indexSrc);
  fs.writeFileSync(indexDest, transformedHtml, 'utf8');
  console.log(`  ✓ Written HTML: ${path.relative(ROOT_DIR, indexDest)}`);

  // 2. Copy and transform styles/, js/, data/, assets/, plus top-level support files
  for (const entry of SOURCE_ENTRIES) {
    if (entry.path === 'index.html') continue;
    const srcSub = path.join(ROOT_DIR, entry.path);
    const destSub = path.join(destDir, entry.path);
    if (entry.type === 'dir') {
      copyDirectory(srcSub, destSub, variant);
      console.log(`  ✓ Packaged ${entry.path}/: ${path.relative(ROOT_DIR, destSub)}`);
    } else if (entry.type === 'file') {
      fs.copyFileSync(srcSub, destSub);
      console.log(`  ✓ Packaged ${entry.path}: ${path.relative(ROOT_DIR, destSub)}`);
    }
  }

  // Verification checks for this variant
  if (variant === 'public') {
    // Assert sensitive items are removed
    const publicConfigPath = path.join(destDir, 'js/config.js');
    if (fs.existsSync(publicConfigPath)) {
      const pubCfg = fs.readFileSync(publicConfigPath, 'utf8');
      if (pubCfg.includes('z@z.com') || pubCfg.includes('zzzzzz')) {
        throw new Error('Privacy leak in public build: test credentials found in js/config.js');
      }
    }
  }

  console.log(`[SUCCESS] ${variant.toUpperCase()} build assembled cleanly at ${destDir}`);
}

/**
 * Main execution routine
 */
function main() {
  console.log('======================================================================');
  console.log('  Andrew Strachan Portfolio: Dual-Variant Build Pipeline');
  console.log('======================================================================');
  console.log(`Target Variant Mode: ${targetVariant.toUpperCase()}`);

  verifySourcePaths();

  if (targetVariant === 'public' || targetVariant === 'all') {
    buildVariant('public');
  }

  if (targetVariant === 'private' || targetVariant === 'all') {
    buildVariant('private');
  }

  console.log('\n======================================================================');
  console.log('Build completed successfully. All distribution targets populated.');
  console.log('======================================================================\n');
  process.exit(0);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error('[FATAL BUILD ERROR]:', err.message);
    process.exit(1);
  }
}

module.exports = {
  main,
  buildVariant,
  sanitizePublicContent,
  preparePrivateContent,
  DIST_PUBLIC,
  DIST_PRIVATE
};
