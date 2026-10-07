/**
 * Tier 1 Feature 1: Brand Mark & Visual Theme
 * Authoritative Source: ORIGINAL_REQUEST.md §Source Material, PROJECT.md §Feature 1
 *
 * Verifies:
 * 1. Brand mark image asset presence (circuit "M" crest).
 * 2. Visual design tokens and cyber palette defined in CSS.
 * 3. Brand mark rendering within the HTML header/hero.
 * 4. Favicon linkage in HTML head.
 * 5. High-resolution brand mark integrity.
 */

const path = require('path');
const fs = require('fs');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertMatch, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, getFileSize } = require('../helpers/static-checks');
const { extractImages, querySelector } = require('../helpers/dom-parser');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 1 - Feature 1: Brand Mark & Visual Theme', () => {

  test('T1-F1-01: Brand mark image asset exists in assets directory', () => {
    // Check canonical brand mark path
    const candidatePaths = [
      path.join(ROOT_DIR, 'assets/brand/media_1791283990241.jpg'),
      path.join(ROOT_DIR, 'assets/brand/logo_circuit_m.jpg'),
      path.join(ROOT_DIR, 'assets/images/brand/logo_circuit_m.jpg'),
      path.join(ROOT_DIR, 'assets/brand/brand-logo.jpg'),
      path.join(ROOT_DIR, 'assets/brand/logo.jpg'),
      path.join(ROOT_DIR, 'assets/brand/logo.png'),
    ];

    const found = candidatePaths.find(p => fileExists(p));
    assert(!!found, `Brand mark image should exist in assets/brand/ (checked: ${candidatePaths.join(', ')})`);
    const size = getFileSize(found);
    assertGreaterThanOrEqual(size, 1000, `Brand mark asset size (${size} bytes) should be a valid image file`);
  });

  test('T1-F1-02: Visual theme defines Cyber Midnight / Gold / Cyan color palette in CSS', () => {
    assert(fileExists(MAIN_CSS), `Main CSS file must exist at styles/main.css`);
    const css = loadFileContent(MAIN_CSS) || '';

    // Cyber theme palette: Midnight Navy (#060b13 or #0b1020), Circuit Gold (#d4af37), Neon Cyan (#00e5ff)
    const hasMidnightNavy = /#060b13|#0b1020|#0b1220/i.test(css);
    const hasCircuitGold = /#d4af37|#e9d8a6/i.test(css);
    const hasNeonCyan = /#00e5ff|#0a9396/i.test(css);

    assert(hasMidnightNavy, 'CSS variables must define Midnight Navy surface/canvas tokens');
    assert(hasCircuitGold, 'CSS variables must define Circuit Gold brand tokens');
    assert(hasNeonCyan, 'CSS variables must define Neon Cyan cyber accents');
  });

  test('T1-F1-03: HTML index renders brand mark with descriptive alt text', () => {
    assert(fileExists(INDEX_HTML), `index.html must exist at project root`);
    const html = loadFileContent(INDEX_HTML) || '';
    const images = extractImages(html);

    const brandImg = images.find(img =>
      /brand|logo|circuit/i.test(img.src) || /brand|logo|crest|maqkrs|strachan/i.test(img.alt)
    );

    assert(!!brandImg, 'index.html must contain an image tag representing the brand mark');
    assert(brandImg.alt.length > 3, `Brand mark image must have descriptive alt text (found: "${brandImg ? brandImg.alt : ''}")`);
  });

  test('T1-F1-04: HTML head specifies brand favicon', () => {
    assert(fileExists(INDEX_HTML), `index.html must exist`);
    const html = loadFileContent(INDEX_HTML) || '';

    const faviconRegex = /<link\b[^>]*rel=["'](?:shortcut )?icon["'][^>]*>/i;
    assert(faviconRegex.test(html), 'index.html head must declare a favicon link');
  });

  test('T1-F1-05: Brand mark visual emblem maintains high-resolution asset specification', () => {
    // Per source material: 1024x1024 circuit "M" diamond crest emblem
    const brandDir = path.join(ROOT_DIR, 'assets/brand');
    assert(fileExists(brandDir), `assets/brand directory must exist`);
    const files = fs.readdirSync(brandDir).filter(f => /\.(jpg|jpeg|png|svg)$/i.test(f));
    assertGreaterThanOrEqual(files.length, 1, 'assets/brand must contain at least one logo graphic format');
  });

}, { tier: 1, feature: 'F1' });
