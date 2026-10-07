#!/usr/bin/env node

/**
 * tests/verify-mobile-interactions.js
 * Empirical Adversarial Verification Suite for Mobile Interactive Components
 *
 * Verifies:
 * 1. Polymorphic Media Modal Player (media types, close button, backdrop, audio/video teardown, title truncation)
 * 2. 4-Tier Academic Accordion (touch toggling, keyboard Enter/Space, aria-expanded sync, tabstop audit)
 * 3. Interactive Salary Explorer (BLS vs GS toggle, visibility switching, aria-selected, stress toggling)
 * 4. Touch Navigation vs Keyboard Cues (@media (hover: hover) gating, mobile swipe cues)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const MAIN_CSS_PATH = path.join(ROOT_DIR, 'styles/main.css');
const COMPONENTS_CSS_PATH = path.join(ROOT_DIR, 'styles/components.css');
const APP_JS_PATH = path.join(ROOT_DIR, 'js/app.js');

const htmlContent = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
const mainCss = fs.readFileSync(MAIN_CSS_PATH, 'utf8');
const compCss = fs.readFileSync(COMPONENTS_CSS_PATH, 'utf8');
const appJs = fs.readFileSync(APP_JS_PATH, 'utf8');

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  bugs: [],
  findings: []
};

function runTest(name, fn) {
  results.total++;
  try {
    fn();
    results.passed++;
    console.log(`  ✓ [PASS] ${name}`);
  } catch (err) {
    results.failed++;
    results.bugs.push({ name, error: err.message });
    console.log(`  ✗ [FAIL] ${name}\n      Error: ${err.message}`);
  }
}

console.log('======================================================================');
console.log('  EMPIRICAL ADVERSARIAL VERIFICATION: MOBILE INTERACTION SUITE');
console.log('======================================================================\n');

// ============================================================================
// SUITE 1: Polymorphic Media Modal Player
// ============================================================================
console.log('--- Suite 1: Polymorphic Media Modal Player ---');

runTest('1.1 Media elements specify explicit data-type attributes and selectors', () => {
  const imageTriggers = htmlContent.match(/data-type=["']image["']/g) || [];
  const videoTriggers = htmlContent.match(/data-type=["']video["']/g) || [];
  assert.ok(imageTriggers.length >= 6, `Expected >= 6 image triggers, found ${imageTriggers.length}`);
  assert.ok(videoTriggers.length >= 3, `Expected >= 3 video triggers, found ${videoTriggers.length}`);
  assert.ok(htmlContent.includes('id="video-modal"'), 'Dialog id="video-modal" must exist');
  assert.ok(htmlContent.includes('id="btn-modal-close"'), 'Close button id="btn-modal-close" must exist');
  assert.ok(htmlContent.includes('id="modal-video-element"'), 'Video element id="modal-video-element" must exist');
});

runTest('1.2 Modal close button CSS enforces z-index: 9999 and pointer-events: auto', () => {
  assert.ok(
    mainCss.includes('.modal-close-btn') && mainCss.includes('9999') && mainCss.includes('pointer-events: auto'),
    'Close button must declare z-index: 9999 and pointer-events: auto in main.css'
  );
  assert.ok(
    appJs.includes("closeBtn.style.zIndex = '9999'") && appJs.includes("closeBtn.style.pointerEvents = 'auto'"),
    'app.js must programmatically enforce close button z-index and pointer-events'
  );
});

runTest('1.3 Modal header CSS guarantees single-line truncation with ellipsis', () => {
  assert.ok(
    mainCss.includes('.modal-title') && mainCss.includes('text-overflow: ellipsis') && mainCss.includes('white-space: nowrap'),
    'Modal title must declare white-space: nowrap and text-overflow: ellipsis in main.css'
  );
  assert.ok(
    mainCss.includes('min-width: 0') || compCss.includes('min-width: 0'),
    'Modal title must declare min-width: 0 to allow flexbox shrinking'
  );
});

runTest('1.4 Close button registers both click and touchend handlers in app.js', () => {
  assert.ok(
    appJs.includes("closeBtn.addEventListener('click', closeModal)"),
    'Close button must register click event listener'
  );
  assert.ok(
    appJs.includes("closeBtn.addEventListener('touchend', closeModal)"),
    'Close button must register touchend event listener'
  );
});

runTest('1.5 Backdrop dismissal registers click and touchend with coordinate checking', () => {
  assert.ok(
    appJs.includes("modal.addEventListener('click', handleBackdropDismiss)"),
    'Modal backdrop must register click dismissal'
  );
  assert.ok(
    appJs.includes("modal.addEventListener('touchend', handleBackdropDismiss)"),
    'Modal backdrop must register touchend dismissal'
  );
  assert.ok(
    appJs.includes('dialogDimensions.left') && appJs.includes('dialogDimensions.right'),
    'Backdrop dismiss logic must compare clientX/clientY against dialog bounding rect'
  );
});

runTest('1.6 Video audio termination & src teardown on explicit closeModal()', () => {
  assert.ok(
    appJs.includes("videoEl.pause()") && appJs.includes("videoEl.removeAttribute('src')") && appJs.includes("videoEl.load()"),
    'closeModal() must pause video, remove src attribute, and call load() to kill media stream'
  );
});

runTest('1.7 [VULNERABILITY CHECK] Video audio termination on modal close via Escape / window.keydown', () => {
  // Check if modal has a 'close' event listener or if window Escape keydown teardown exists
  const hasCloseEventListener = /modal\.addEventListener\(\s*['"]close['"]/.test(appJs);
  const escTeardownCallsCloseModal = /e\.key === ['"]Escape['"][\s\S]{1,200}closeModal/.test(appJs);

  if (!hasCloseEventListener && !escTeardownCallsCloseModal) {
    throw new Error(
      'CRITICAL LEAK: Modal does NOT listen to "close" event. In initKeyboardNavigation(), ' +
      'Escape calls modal.close() directly, which does NOT fire "cancel". ' +
      'Video audio continues playing in background when closed via window Escape key!'
    );
  }
});

// ============================================================================
// SUITE 2: 4-Tier Academic Accordion
// ============================================================================
console.log('\n--- Suite 2: 4-Tier Academic Accordion ---');

runTest('2.1 Exactly 4 tiers exist in education-accordion-container', () => {
  const containerMatch = htmlContent.match(/class=["']education-accordion-container["'][\s\S]*?<\/div>\s*<\/div>/);
  assert.ok(containerMatch, 'education-accordion-container must exist in HTML');
  const tiers = htmlContent.match(/class=["']accordion glass-card(?:\s+active)?["']/g) || [];
  assert.strictEqual(tiers.length, 4, `Expected exactly 4 accordion tiers, found ${tiers.length}`);
});

runTest('2.2 Initial accordion state: Tier 1 active (aria-expanded="true"), Tiers 2-4 collapsed (aria-expanded="false")', () => {
  const tier1HeaderMatch = htmlContent.match(/class=["']accordion glass-card active["'][\s\S]*?class=["']accordion-header["'][^>]*aria-expanded=["']true["']/);
  assert.ok(tier1HeaderMatch, 'Tier 1 must have class="active" and aria-expanded="true"');

  const inactiveMatches = htmlContent.match(/class=["']accordion glass-card["'][\s\S]*?class=["']accordion-header["'][^>]*aria-expanded=["']false["']/g) || [];
  assert.strictEqual(inactiveMatches.length, 3, `Expected 3 inactive accordion tiers with aria-expanded="false", found ${inactiveMatches.length}`);
});

runTest('2.3 Accordion header handles click and keydown with Enter/Space filtering', () => {
  assert.ok(
    appJs.includes("header.addEventListener('click', toggle)"),
    'Accordion header must register click listener'
  );
  assert.ok(
    appJs.includes("header.addEventListener('keydown', toggle)"),
    'Accordion header must register keydown listener'
  );
  assert.ok(
    appJs.includes("e.key !== 'Enter'") && appJs.includes("e.key !== ' '") && appJs.includes("e.key !== 'Spacebar'"),
    'Accordion keydown handler must permit Enter, Space, and Spacebar'
  );
  assert.ok(
    appJs.includes("e.preventDefault()"),
    'Accordion keydown handler must call preventDefault() on Space/Enter'
  );
});

runTest('2.4 CSS rule for active accordion display synchronization exists', () => {
  assert.ok(
    mainCss.includes('.accordion.active .accordion-content') && mainCss.includes('display: block'),
    'CSS must declare .accordion.active .accordion-content { display: block; }'
  );
  assert.ok(
    mainCss.includes('.accordion-content') && mainCss.includes('display: none'),
    'CSS must declare base .accordion-content { display: none; }'
  );
});

runTest('2.5 [A11Y/UX AUDIT] Accordion container tabindex audit', () => {
  // WAI-ARIA Accordion requires only the interactive button/header to have tabindex="0".
  // Having tabindex="0" on outer <div class="accordion"> creates redundant, un-triggerable tab stops.
  const outerTabindexMatches = htmlContent.match(/<div class=["']accordion glass-card[^>]*tabindex=["']0["']/g) || [];
  if (outerTabindexMatches.length > 0) {
    results.findings.push({
      type: 'A11Y_REDUNDANT_TABSTOP',
      detail: `Found ${outerTabindexMatches.length} outer .accordion divs with tabindex="0". Keyboard users encounter duplicate tabstops where Enter/Space does not activate toggle.`
    });
    console.log(`      [A11Y NOTE] Outer .accordion container has redundant tabindex="0" (${outerTabindexMatches.length} instances)`);
  }
});

// ============================================================================
// SUITE 3: Interactive Salary Explorer
// ============================================================================
console.log('\n--- Suite 3: Interactive Salary Explorer ---');

runTest('3.1 Salary Explorer markup structure adheres to tablist/tab/tabpanel roles', () => {
  assert.ok(htmlContent.includes('id="salary-explorer-toggle"'), 'Container #salary-explorer-toggle must exist');
  assert.ok(htmlContent.includes('role="tablist"'), 'Toggle container must have role="tablist"');
  assert.ok(htmlContent.includes('data-mode="bls"') && htmlContent.includes('role="tab"'), 'BLS button must have role="tab"');
  assert.ok(htmlContent.includes('data-mode="gs"') && htmlContent.includes('role="tab"'), 'GS button must have role="tab"');
  assert.ok(htmlContent.includes('aria-controls="salary-pane-bls"'), 'BLS button must declare aria-controls="salary-pane-bls"');
  assert.ok(htmlContent.includes('aria-controls="salary-pane-gs"'), 'GS button must declare aria-controls="salary-pane-gs"');
  assert.ok(htmlContent.includes('id="salary-pane-bls"') && htmlContent.includes('role="tabpanel"'), 'BLS pane must have role="tabpanel"');
  assert.ok(htmlContent.includes('id="salary-pane-gs"') && htmlContent.includes('role="tabpanel"'), 'GS pane must have role="tabpanel"');
});

runTest('3.2 Initial Salary Explorer state: BLS active (aria-selected="true"), GS hidden (display: none)', () => {
  assert.ok(
    htmlContent.includes('data-mode="bls" role="tab" aria-selected="true"') ||
    htmlContent.includes('data-mode="bls" class="salary-toggle-btn active" role="tab" aria-selected="true"'),
    'BLS button must initially be active and have aria-selected="true"'
  );
  assert.ok(
    htmlContent.includes('data-mode="gs" role="tab" aria-selected="false"'),
    'GS button must initially have aria-selected="false"'
  );
  assert.ok(
    htmlContent.includes('id="salary-pane-gs" class="salary-pane" role="tabpanel" style="display: none;"'),
    'GS pane must initially be hidden with display: none'
  );
});

runTest('3.3 Salary toggle buttons register click and touchend with display switching in app.js', () => {
  assert.ok(
    appJs.includes("btn.addEventListener('click', handleToggle)"),
    'Salary buttons must register click event listener'
  );
  assert.ok(
    appJs.includes("btn.addEventListener('touchend', handleToggle)"),
    'Salary buttons must register touchend event listener'
  );
  assert.ok(
    appJs.includes("b.setAttribute('aria-selected', isActive ? 'true' : 'false')"),
    'handleToggle must synchronize aria-selected attribute'
  );
  assert.ok(
    appJs.includes("blsPane.style.display = 'none'") && appJs.includes("gsPane.style.display = 'block'"),
    'handleToggle must toggle display between blsPane and gsPane'
  );
});

// ============================================================================
// SUITE 4: Touch Navigation vs Keyboard Cues
// ============================================================================
console.log('\n--- Suite 4: Touch Navigation vs Keyboard Cues ---');

runTest('4.1 CSS media queries gate .nav-cues and .mobile-swipe-cues', () => {
  assert.ok(
    mainCss.includes('.nav-cues { display: none !important; }'),
    '.nav-cues must default to display: none !important;'
  );
  assert.ok(
    mainCss.includes('@media (hover: hover) and (pointer: fine)') &&
    mainCss.includes('.nav-cues { display: flex !important; }'),
    '@media (hover: hover) and (pointer: fine) must show .nav-cues'
  );
  assert.ok(
    mainCss.includes('.mobile-swipe-cues { display: flex !important; }'),
    '.mobile-swipe-cues must default to display: flex !important;'
  );
  assert.ok(
    mainCss.includes('@media (hover: hover) and (pointer: fine)') &&
    mainCss.includes('.mobile-swipe-cues { display: none !important; }'),
    '@media (hover: hover) and (pointer: fine) must hide .mobile-swipe-cues'
  );
});

runTest('4.2 Semantic separation of keyboard shortcuts vs touch swipe instructions in HTML', () => {
  assert.ok(
    htmlContent.includes('class="nav-cues"') &&
    htmlContent.includes('Hotkeys:') &&
    htmlContent.includes('Space') &&
    htmlContent.includes('1-8'),
    '.nav-cues container must house keyboard hotkeys'
  );
  assert.ok(
    htmlContent.includes('class="mobile-swipe-cues"') &&
    htmlContent.includes('Touch Navigation: Swipe left/right'),
    '.mobile-swipe-cues container must house touch navigation instructions'
  );
});

// ============================================================================
// SUMMARY & VERDICT
// ============================================================================
console.log('\n----------------------------------------------------------------------');
console.log(`TOTAL TESTS: ${results.total} | PASSED: ${results.passed} | FAILED: ${results.failed}`);
if (results.bugs.length > 0) {
  console.log('CRITICAL DEFECTS IDENTIFIED:');
  results.bugs.forEach(b => console.log(`  - ${b.name}: ${b.error}`));
}
if (results.findings.length > 0) {
  console.log('SECONDARY FINDINGS:');
  results.findings.forEach(f => console.log(`  - [${f.type}] ${f.detail}`));
}
console.log('----------------------------------------------------------------------\n');

process.exit(results.failed > 0 ? 1 : 0);
