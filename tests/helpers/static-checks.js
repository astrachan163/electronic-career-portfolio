/**
 * Static file, privacy, link, and JSON validation utilities
 */

const fs = require('fs');
const path = require('path');

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function loadJsonSafely(filePath) {
  if (!fileExists(filePath)) {
    return { error: `File not found: ${filePath}`, data: null };
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return { error: null, data: JSON.parse(raw) };
  } catch (err) {
    return { error: `Failed to parse JSON in ${filePath}: ${err.message}`, data: null };
  }
}

function loadFileContent(filePath) {
  if (!fileExists(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

function findFiles(dir, filter = () => true) {
  const results = [];
  if (!fileExists(dir)) return results;

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.agents') {
          traverse(fullPath);
        }
      } else if (entry.isFile()) {
        if (filter(fullPath, entry.name)) {
          results.push(fullPath);
        }
      }
    }
  }

  traverse(dir);
  return results;
}

/**
 * Scans content for privacy violations:
 * - Phone numbers (like 228-224-7445)
 * - Hardcoded test credentials (like z@z.com, zzzzzz)
 * - Sensitive email accounts
 */
function checkPrivacyViolations(content) {
  const violations = [];

  // Phone regex matching (xxx) xxx-xxxx or xxx-xxx-xxxx
  const phoneRegex = /\b(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  let match;
  while ((match = phoneRegex.exec(content)) !== null) {
    // Exclude false positives like standard year spans (e.g. 2024-2025)
    if (!/^\d{4}-\d{4}$/.test(match[0])) {
      violations.push({ type: 'PHONE_NUMBER', value: match[0], index: match.index });
    }
  }

  // Hardcoded test credentials
  if (content.includes('z@z.com')) {
    violations.push({ type: 'TEST_CREDENTIAL_USER', value: 'z@z.com' });
  }
  if (content.includes('zzzzzz')) {
    violations.push({ type: 'TEST_CREDENTIAL_PASSWORD', value: 'zzzzzz' });
  }

  // Private developer email addresses
  const privateEmailRegex = /\b[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com|outlook\.com)\b/gi;
  while ((match = privateEmailRegex.exec(content)) !== null) {
    violations.push({ type: 'PRIVATE_EMAIL', value: match[0], index: match.index });
  }

  return violations;
}

/**
 * Checks if a media file exceeds the 100 MB limit
 */
function getFileSize(filePath) {
  if (!fileExists(filePath)) return -1;
  const stat = fs.statSync(filePath);
  return stat.size;
}

module.exports = {
  fileExists,
  loadJsonSafely,
  loadFileContent,
  findFiles,
  checkPrivacyViolations,
  getFileSize,
};
