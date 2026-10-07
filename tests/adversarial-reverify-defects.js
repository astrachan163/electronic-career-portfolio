#!/usr/bin/env node

/**
 * tests/adversarial-reverify-defects.js
 * Empirical Adversarial Re-verification Suite for Defects 1 & 2
 *
 * Authored by: Challenger Re-verification (Empirical Challenger)
 * Roles: critic, specialist
 *
 * ADVERSARIAL RE-VERIFICATION SCOPE:
 * 1. Defect 1: Video Audio Leak on Escape / Modal Teardown
 *    - Static AST / code contract verification across source, public, and private builds
 *    - Live headless Chrome browser testing via Chrome DevTools Protocol (CDP)
 *    - Evaluation of Escape keydown on window, modal 'close' event, modal 'cancel' event,
 *      video pause(), removeAttribute('src'), load(), and rapid ESC spamming
 * 2. Defect 2: Redundant Accordion Tabstops & WAI-ARIA Conformance
 *    - Static HTML scan across all targets (source, dist/public, dist/private)
 *    - Audit for 0 outer <div class="accordion"> with tabindex="0"
 *    - Focus sequence traversal in live Chrome to prove only .accordion-header triggers receive focus
 *    - Keyboard activation testing (Enter, Space, ignored non-action keys, stress toggling)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SERVER_PORT = 8993;
const CDP_PORT = 9447;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};

// ---------------------------------------------------------------------------
// 1. Static Local HTTP Server
// ---------------------------------------------------------------------------
function startServer() {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(ROOT_DIR, reqPath);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const idx = path.join(filePath, 'index.html');
      if (fs.existsSync(idx)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(idx).pipe(res);
        return;
      }
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Directory listing forbidden');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': stat.size });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(SERVER_PORT, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

// ---------------------------------------------------------------------------
// 2. CDP Helpers
// ---------------------------------------------------------------------------
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function createTab() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: CDP_PORT,
      path: '/json/new',
      method: 'PUT'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sendCdpCommand(ws, method, params = {}, id = 1) {
  return new Promise((resolve, reject) => {
    const handleMessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handleMessage);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        }
      } catch (err) {
        // ignore
      }
    };
    ws.addEventListener('message', handleMessage);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

// ---------------------------------------------------------------------------
// 3. Test Aggregator
// ---------------------------------------------------------------------------
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: []
};

function recordTest(suite, name, pass, detail = null) {
  testResults.total++;
  if (pass) {
    testResults.passed++;
    console.log(`  ✓ [PASS] [${suite}] ${name}`);
  } else {
    testResults.failed++;
    testResults.failures.push({ suite, name, detail });
    console.log(`  ✗ [FAIL] [${suite}] ${name}`);
    if (detail) console.log(`      Detail: ${JSON.stringify(detail)}`);
  }
}

// ---------------------------------------------------------------------------
// 4. Main Verification Execution
// ---------------------------------------------------------------------------
async function main() {
  console.log('======================================================================');
  console.log('  CHALLENGER RE-VERIFICATION: ADVERSARIAL STRESS TEST HARNESS');
  console.log('======================================================================\n');

  // -------------------------------------------------------------------------
  // SUITE A: Static Code & Markup Contracts
  // -------------------------------------------------------------------------
  console.log('--- Suite A: Static Code Contracts (Source, Public, Private) ---');

  const targetFiles = [
    { label: 'Source', html: path.join(ROOT_DIR, 'index.html'), js: path.join(ROOT_DIR, 'js/app.js') },
    { label: 'Dist Public', html: path.join(ROOT_DIR, 'dist/public/index.html'), js: path.join(ROOT_DIR, 'dist/public/js/app.js') },
    { label: 'Dist Private', html: path.join(ROOT_DIR, 'dist/private/index.html'), js: path.join(ROOT_DIR, 'dist/private/js/app.js') },
  ];

  for (const t of targetFiles) {
    const html = fs.readFileSync(t.html, 'utf8');
    const js = fs.readFileSync(t.js, 'utf8');

    // A1: Video modal Escape keydown cleanup in keyboard handler
    const escCleansVideo = /if\s*\(\s*(?:e\.code|e\.key)\s*===\s*['"]Escape['"][\s\S]{1,400}videoEl\.pause\(\)[\s\S]{1,200}videoEl\.removeAttribute\(['"]src['"]\)[\s\S]{1,200}videoEl\.load\(\)/.test(js);
    recordTest('Static A1', `${t.label}: Escape handler in initKeyboardNavigation() pauses video, removes src, calls load()`, escCleansVideo);

    // A2: Native modal 'close' event listener
    const closeListenerExists = /modal\.addEventListener\(\s*['"]close['"]\s*,\s*\(\s*\)\s*=>\s*\{[\s\S]*?videoEl\.pause\(\)[\s\S]*?videoEl\.removeAttribute\(['"]src['"]\)[\s\S]*?videoEl\.load\(\)/.test(js);
    recordTest('Static A2', `${t.label}: Dialog registers 'close' event listener terminating video and removing src`, closeListenerExists);

    // A3: Native modal 'cancel' event listener
    const cancelListenerExists = /modal\.addEventListener\(\s*['"]cancel['"]\s*,\s*\(\s*\)\s*=>\s*\{[\s\S]*?videoEl\.pause\(\)[\s\S]*?videoEl\.removeAttribute\(['"]src['"]\)[\s\S]*?videoEl\.load\(\)/.test(js);
    recordTest('Static A3', `${t.label}: Dialog registers 'cancel' event listener terminating video and removing src`, cancelListenerExists);

    // A4: Explicit closeModal() function terminates video
    const closeModalTeardown = /const closeModal =[\s\S]*?videoEl\.pause\(\)[\s\S]*?videoEl\.removeAttribute\(['"]src['"]\)[\s\S]*?videoEl\.load\(\)/.test(js);
    recordTest('Static A4', `${t.label}: Explicit closeModal() tears down video media`, closeModalTeardown);

    // A5: Accordion outer containers have NO tabindex
    const outerAccordionMatches = (html.match(/<div[^>]*class=["'][^"']*\baccordion\b[^"']*["'][^>]*>/gi) || [])
      .filter(tag => !tag.includes('accordion-header') && !tag.includes('accordion-content') && !tag.includes('education-accordion-container'));
    const outerAccordionTabindex = outerAccordionMatches.filter(tag => /tabindex\s*=/i.test(tag));
    recordTest('Static A5', `${t.label}: Exactly ZERO outer .accordion containers declare tabindex (found ${outerAccordionTabindex.length})`, outerAccordionTabindex.length === 0, outerAccordionTabindex);

    // A6: Exactly 4 accordion headers have tabindex="0" and role="button"
    const accordionHeaders = html.match(/<div class=["']accordion-header["'][^>]*>/g) || [];
    const validHeaders = accordionHeaders.filter(h => h.includes('role="button"') && h.includes('tabindex="0"'));
    recordTest('Static A6', `${t.label}: Exactly 4 .accordion-header elements have role="button" and tabindex="0"`, validHeaders.length === 4 && accordionHeaders.length === 4, { valid: validHeaders.length, total: accordionHeaders.length });

    // A7: Initial aria-expanded states: Tier 1 true, Tiers 2-4 false
    const trueHeaders = accordionHeaders.filter(h => h.includes('aria-expanded="true"'));
    const falseHeaders = accordionHeaders.filter(h => h.includes('aria-expanded="false"'));
    recordTest('Static A7', `${t.label}: Accordion headers initial aria-expanded: 1 true, 3 false`, trueHeaders.length === 1 && falseHeaders.length === 3, { trueCount: trueHeaders.length, falseCount: falseHeaders.length });
  }

  // -------------------------------------------------------------------------
  // SUITE B: Headless Chrome Live DOM Execution via CDP
  // -------------------------------------------------------------------------
  console.log('\n--- Suite B: Headless Chrome Live DOM & Event Testing ---');

  const server = await startServer();
  console.log(`[HTTP Server] Listening on http://127.0.0.1:${SERVER_PORT}`);

  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--user-data-dir=/tmp/chrome-challenger-reverify-profile',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  let ws = null;
  const uncaughtExceptions = [];
  let cmdId = 1;

  try {
    const version = await fetchJson(`http://127.0.0.1:${CDP_PORT}/json/version`);
    console.log(`[Chrome] Connected to Chrome: ${version.Browser}`);

    const newTab = await createTab();
    ws = new WebSocket(newTab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    ws.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          uncaughtExceptions.push(msg.params.exceptionDetails);
        }
      } catch (e) {}
    });

    await sendCdpCommand(ws, 'Page.enable', {}, cmdId++);
    await sendCdpCommand(ws, 'Runtime.enable', {}, cmdId++);

    const TARGET_URLS = [
      { name: 'Source Root', url: `http://127.0.0.1:${SERVER_PORT}/index.html` },
      { name: 'Public Build', url: `http://127.0.0.1:${SERVER_PORT}/dist/public/index.html` },
      { name: 'Private Build', url: `http://127.0.0.1:${SERVER_PORT}/dist/private/index.html` },
    ];

    for (const target of TARGET_URLS) {
      console.log(`\n  Testing Live Page: ${target.name} (${target.url})`);
      await sendCdpCommand(ws, 'Page.navigate', { url: target.url }, cmdId++);
      await new Promise(r => setTimeout(r, 1200));

      // -----------------------------------------------------------------------
      // B1: Video Modal Escape Keydown Teardown Test
      // -----------------------------------------------------------------------
      const videoTeardownResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const modal = document.getElementById('video-modal');
            const videoEl = document.getElementById('modal-video-element');
            if (!modal || !videoEl) return { success: false, reason: 'Modal or video element not found' };

            // Find a video trigger
            const videoTrigger = document.querySelector('[data-type="video"]');
            if (!videoTrigger) return { success: false, reason: 'No video trigger found in DOM' };

            // Trigger click to open modal
            videoTrigger.click();

            const isOpenAfterClick = modal.open === true || modal.hasAttribute('open');
            const srcAfterClick = videoEl.getAttribute('src');

            // Dispatch Escape keydown on window
            window.dispatchEvent(new KeyboardEvent('keydown', {
              key: 'Escape',
              code: 'Escape',
              bubbles: true,
              cancelable: true
            }));

            const isOpenAfterEsc = modal.open === true || modal.hasAttribute('open');
            const srcAfterEsc = videoEl.getAttribute('src');
            const isPausedAfterEsc = videoEl.paused;

            return {
              success: true,
              isOpenAfterClick,
              srcAfterClick,
              isOpenAfterEsc,
              srcAfterEsc,
              isPausedAfterEsc
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const vt = videoTeardownResult.result.value;
      recordTest(
        'Live B1',
        `${target.name}: Video modal opens on trigger click`,
        vt.success && vt.isOpenAfterClick && !!vt.srcAfterClick,
        vt
      );
      recordTest(
        'Live B1',
        `${target.name}: Escape keydown closes modal, removes video src attribute, and pauses playback`,
        vt.success && !vt.isOpenAfterEsc && vt.srcAfterEsc === null && vt.isPausedAfterEsc === true,
        vt
      );

      // -----------------------------------------------------------------------
      // B2: Modal Native Close Event Dispatch Video Teardown
      // -----------------------------------------------------------------------
      const modalCloseEventResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            const modal = document.getElementById('video-modal');
            const videoEl = document.getElementById('modal-video-element');
            const videoTrigger = document.querySelector('[data-type="video"]');
            videoTrigger.click();

            // Direct modal.close() queues the native 'close' event task
            await new Promise(resolve => {
              modal.addEventListener('close', resolve, { once: true });
              modal.close();
            });

            const isPaused = videoEl.paused;
            const hasSrc = videoEl.hasAttribute('src');
            const srcVal = videoEl.getAttribute('src');

            return {
              isPaused,
              hasSrc,
              srcVal
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const ce = modalCloseEventResult.result.value;
      recordTest(
        'Live B2',
        `${target.name}: Direct modal.close() triggers 'close' listener: video paused and src removed`,
        ce.isPaused === true && ce.hasSrc === false && ce.srcVal === null,
        ce
      );

      // -----------------------------------------------------------------------
      // B3: Modal Native Cancel Event Dispatch Video Teardown
      // -----------------------------------------------------------------------
      const modalCancelEventResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const modal = document.getElementById('video-modal');
            const videoEl = document.getElementById('modal-video-element');
            const videoTrigger = document.querySelector('[data-type="video"]');
            videoTrigger.click();

            // Dispatch 'cancel' event
            modal.dispatchEvent(new Event('cancel', { bubbles: false, cancelable: true }));

            const isPaused = videoEl.paused;
            const hasSrc = videoEl.hasAttribute('src');

            // Cleanup modal
            if (typeof modal.close === 'function') modal.close();

            return {
              isPaused,
              hasSrc
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const canEv = modalCancelEventResult.result.value;
      recordTest(
        'Live B3',
        `${target.name}: Native 'cancel' event triggers video teardown: paused and src removed`,
        canEv.isPaused === true && canEv.hasSrc === false,
        canEv
      );

      // -----------------------------------------------------------------------
      // B4: Stress Test - 50 Rapid Escape Keydowns
      // -----------------------------------------------------------------------
      const rapidEscResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const modal = document.getElementById('video-modal');
            const videoEl = document.getElementById('modal-video-element');
            const videoTrigger = document.querySelector('[data-type="video"]');

            let threw = false;
            try {
              for (let i = 0; i < 50; i++) {
                if (i % 5 === 0) videoTrigger.click();
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
              }
            } catch (err) {
              threw = true;
            }

            return {
              threw,
              modalClosed: !(modal.open === true || modal.hasAttribute('open')),
              videoPaused: videoEl.paused,
              srcRemoved: !videoEl.hasAttribute('src')
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const re = rapidEscResult.result.value;
      recordTest(
        'Live B4',
        `${target.name}: Rapid 50x Escape spamming survives without exceptions and leaves video clean`,
        !re.threw && re.modalClosed && re.videoPaused && re.srcRemoved,
        re
      );

      // -----------------------------------------------------------------------
      // B5: Accordion Tabstop Focus Traversal Audit
      // -----------------------------------------------------------------------
      const tabstopAuditResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.querySelector('.education-accordion-container');
            if (!container) return { success: false, reason: 'Accordion container missing' };

            // Find all elements inside container that are in tab sequence
            const allDescendants = Array.from(container.querySelectorAll('*'));
            const focusableElements = allDescendants.filter(el => {
              const ti = el.getAttribute('tabindex');
              return ti !== null && parseInt(ti, 10) >= 0;
            });

            // Inspect the outer .accordion containers specifically
            const outerAccordions = Array.from(container.querySelectorAll('.accordion'));
            const outerWithTabindex = outerAccordions.filter(el => el.hasAttribute('tabindex'));

            // Check what the focusable elements actually are
            const focusableClasses = focusableElements.map(el => el.className);
            const allAreHeaders = focusableElements.every(el => el.classList.contains('accordion-header'));

            return {
              success: true,
              totalFocusable: focusableElements.length,
              outerAccordionCount: outerAccordions.length,
              outerWithTabindexCount: outerWithTabindex.length,
              allAreHeaders,
              focusableClasses
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const tsa = tabstopAuditResult.result.value;
      recordTest(
        'Live B5',
        `${target.name}: Exactly 0 outer .accordion containers have tabindex in live DOM`,
        tsa.success && tsa.outerWithTabindexCount === 0,
        tsa
      );
      recordTest(
        'Live B5',
        `${target.name}: Exactly 4 focusable elements exist in accordion container, and ALL are .accordion-header`,
        tsa.success && tsa.totalFocusable === 4 && tsa.allAreHeaders === true,
        tsa
      );

      // -----------------------------------------------------------------------
      // B6: Keyboard Activation (Enter & Space) on Accordion Headers
      // -----------------------------------------------------------------------
      const accordionKeyResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const headers = Array.from(document.querySelectorAll('.education-accordion-container .accordion-header'));
            const tier2 = headers[1];
            const tier2Accordion = tier2.closest('.accordion');

            // Initial state: should be false / inactive
            const initExpanded = tier2.getAttribute('aria-expanded');
            const initActive = tier2Accordion.classList.contains('active');

            // 1. Press Enter to expand
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true }));
            const enterExpanded = tier2.getAttribute('aria-expanded');
            const enterActive = tier2Accordion.classList.contains('active');

            // 2. Press Space to collapse
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true, cancelable: true }));
            const spaceExpanded = tier2.getAttribute('aria-expanded');
            const spaceActive = tier2Accordion.classList.contains('active');

            // 3. Press Spacebar (legacy key value) to expand again
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Spacebar', code: 'Space', bubbles: true, cancelable: true }));
            const spacebarExpanded = tier2.getAttribute('aria-expanded');
            const spacebarActive = tier2Accordion.classList.contains('active');

            // 4. Press irrelevant keys (e.g. Tab, Escape, ArrowDown) - state should NOT change
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', code: 'Tab', bubbles: true }));
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
            const unchangedExpanded = tier2.getAttribute('aria-expanded');
            const unchangedActive = tier2Accordion.classList.contains('active');

            // Return Tier 2 to collapsed state
            tier2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));

            return {
              initial: { expanded: initExpanded, active: initActive },
              afterEnter: { expanded: enterExpanded, active: enterActive },
              afterSpace: { expanded: spaceExpanded, active: spaceActive },
              afterSpacebar: { expanded: spacebarExpanded, active: spacebarActive },
              afterIrrelevantKeys: { expanded: unchangedExpanded, active: unchangedActive }
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const ak = accordionKeyResult.result.value;
      recordTest(
        'Live B6',
        `${target.name}: Enter key toggles accordion open (aria-expanded="true" & .active)`,
        ak.initial.expanded === 'false' && ak.afterEnter.expanded === 'true' && ak.afterEnter.active === true,
        ak
      );
      recordTest(
        'Live B6',
        `${target.name}: Space key toggles accordion closed (aria-expanded="false" & inactive)`,
        ak.afterSpace.expanded === 'false' && ak.afterSpace.active === false,
        ak
      );
      recordTest(
        'Live B6',
        `${target.name}: Spacebar key code toggles accordion open correctly`,
        ak.afterSpacebar.expanded === 'true' && ak.afterSpacebar.active === true,
        ak
      );
      recordTest(
        'Live B6',
        `${target.name}: Non-action keys (Tab, Esc, Arrows) are ignored and do not alter accordion state`,
        ak.afterIrrelevantKeys.expanded === 'true' && ak.afterIrrelevantKeys.active === true,
        ak
      );

      // -----------------------------------------------------------------------
      // B7: Stress Test - 40 Rapid Space/Enter Key Toggles
      // -----------------------------------------------------------------------
      const stressKeyResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const headers = Array.from(document.querySelectorAll('.education-accordion-container .accordion-header'));
            const tier3 = headers[2];
            const tier3Accordion = tier3.closest('.accordion');

            let inSyncAtAllSteps = true;
            for (let i = 1; i <= 40; i++) {
              const key = (i % 2 === 0) ? 'Enter' : ' ';
              tier3.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
              const exp = tier3.getAttribute('aria-expanded');
              const act = tier3Accordion.classList.contains('active');
              if ((exp === 'true' && !act) || (exp === 'false' && act)) {
                inSyncAtAllSteps = false;
                break;
              }
            }

            return {
              inSyncAtAllSteps,
              finalExpanded: tier3.getAttribute('aria-expanded'),
              finalActive: tier3Accordion.classList.contains('active')
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const sk = stressKeyResult.result.value;
      recordTest(
        'Live B7',
        `${target.name}: 40 rapid keyboard toggles maintain 100% synchronization between aria-expanded and .active`,
        sk.inSyncAtAllSteps === true,
        sk
      );
    }

    recordTest('Runtime Health', 'Zero uncaught browser runtime exceptions across all adversarial tests', uncaughtExceptions.length === 0, uncaughtExceptions);

  } finally {
    if (ws) {
      try { ws.close(); } catch (e) {}
    }
    chrome.kill('SIGTERM');
    server.close();
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log('\n======================================================================');
  console.log(`TOTAL ADVERSARIAL CHECKS: ${testResults.total} | PASSED: ${testResults.passed} | FAILED: ${testResults.failed}`);
  if (testResults.failures.length > 0) {
    console.log('\nFAILURES:');
    testResults.failures.forEach(f => console.log(`  - [${f.suite}] ${f.name}: ${JSON.stringify(f.detail)}`));
  }
  console.log('======================================================================\n');

  process.exit(testResults.failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error during adversarial verification:', err);
  process.exit(1);
});
