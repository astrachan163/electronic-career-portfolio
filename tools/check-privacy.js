#!/usr/bin/env node

/**
 * tools/check-privacy.js
 * Automated Privacy & Redaction Scanner for Andrew Strachan's Electronic Career Portfolio.
 * Scans production build targets (dist/public/ by default) for:
 * 1. Personal telephone numbers (e.g. 228-224-7445)
 * 2. Authorized test credentials (z@z.com / zzzzzz)
 * 3. Unwhitelisted personal email addresses
 *
 * Exit code:
 *   0 - Clean (0 leaks found)
 *   1 - Leaks detected (violating files listed)
 *
 * Usage:
 *   node tools/check-privacy.js [targetDir]
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_TARGET = path.join(ROOT_DIR, 'dist/public');

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : (fs.existsSync(DEFAULT_TARGET) ? DEFAULT_TARGET : ROOT_DIR);

function findScannableFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const name = entry.name;
        // Ignore non-public and test/agent directories
        if (['node_modules', '.git', '.agents', 'tests', 'dist/private', 'atlas_hero_update', 'atlas_live_backup'].includes(name)) {
          continue;
        }
        walk(path.join(current, name));
      } else if (entry.isFile()) {
        if (/\.(html|js|json|css)$/i.test(entry.name)) {
          files.push(path.join(current, entry.name));
        }
      }
    }
  }

  walk(dir);
  return files;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  // 1. Phone number check: (xxx) xxx-xxxx or xxx-xxx-xxxx
  const phoneRegex = /\b(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  let match;
  while ((match = phoneRegex.exec(content)) !== null) {
    if (!/^\d{4}-\d{4}$/.test(match[0])) {
      violations.push({ type: 'PHONE_NUMBER', match: match[0], index: match.index });
    }
  }

  // 2. Test logins check
  if (content.includes('z@z.com')) {
    violations.push({ type: 'TEST_CREDENTIAL_USER', match: 'z@z.com' });
  }
  if (content.includes('zzzzzz')) {
    violations.push({ type: 'TEST_CREDENTIAL_PASSWORD', match: 'zzzzzz' });
  }

  // 3. Unapproved personal emails
  const personalEmailRegex = /\b[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com\b/gi;
  while ((match = personalEmailRegex.exec(content)) !== null) {
    violations.push({ type: 'PERSONAL_EMAIL', match: match[0], index: match.index });
  }

  return violations;
}

function main() {
  console.log('======================================================================');
  console.log('  Andrew Strachan Portfolio: Privacy & Redaction Scanner');
  console.log('======================================================================');
  console.log(`Scan Target: ${targetDir}`);

  if (!fs.existsSync(targetDir)) {
    console.error(`[ERROR] Scan target directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  const files = findScannableFiles(targetDir);
  console.log(`Scanning ${files.length} production files...\n`);

  let totalViolations = 0;
  const violationReports = [];

  for (const file of files) {
    const fileViolations = scanFile(file);
    if (fileViolations.length > 0) {
      totalViolations += fileViolations.length;
      violationReports.push({ file, violations: fileViolations });
    }
  }

  if (totalViolations > 0) {
    console.error(`[FAIL] Detected ${totalViolations} privacy/redaction violations across ${violationReports.length} files:\n`);
    for (const report of violationReports) {
      const relPath = path.relative(ROOT_DIR, report.file);
      console.error(`  File: ${relPath}`);
      for (const v of report.violations) {
        console.error(`    - [${v.type}] Found "${v.match}"`);
      }
    }
    console.error('\nScan failed with privacy leaks.');
    process.exit(1);
  } else {
    // Save evidence artifacts
    const evidenceDir = path.join(ROOT_DIR, 'reports/evidence');
    if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir, { recursive: true });

    const privacyResult = {
      timestamp: new Date().toISOString(),
      targetDirectory: targetDir,
      totalFilesScanned: files.length,
      violationsCount: totalViolations,
      violationReports,
      verifiedRules: {
        phoneNumbers: 0,
        testCredentials: 0,
        personalEmails: 0
      },
      passed: totalViolations === 0
    };

    fs.writeFileSync(path.join(evidenceDir, 'privacy-scan.json'), JSON.stringify(privacyResult, null, 2), 'utf8');

    const privacyMd = `# Public Build Privacy & Redaction Scan Report

- **Timestamp**: ${privacyResult.timestamp}
- **Target Directory**: \`${path.relative(ROOT_DIR, targetDir)}\`
- **Status**: **${privacyResult.passed ? 'PASSED (0 Leaks Detected)' : 'FAILED'}**
- **Files Scanned**: ${files.length}
- **Violations**: ${totalViolations}

## Verification Results
- **Phone Numbers**: 0 detected (all telephone patterns properly sanitized)
- **Test Credentials**: 0 detected (no \`z@z.com\` or \`zzzzzz\` in public build)
- **Personal Emails**: 0 unwhitelisted personal addresses (whitelisted: \`strachan@uab.edu\`)
`;
    fs.writeFileSync(path.join(evidenceDir, 'privacy-scan.md'), privacyMd, 'utf8');

    console.log(`[PASS] 0 privacy leaks detected across all ${files.length} scanned files.`);
    console.log('Verified: 0 phone numbers, 0 test credentials, 0 personal emails.');
    console.log('Saved reports/evidence/privacy-scan.json and privacy-scan.md');
    console.log('======================================================================\n');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  scanFile,
  findScannableFiles,
  main
};
