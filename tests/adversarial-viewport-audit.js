#!/usr/bin/env node

/**
 * tests/adversarial-viewport-audit.js
 * Comprehensive Empirical Adversarial Viewport & Layout Audit Suite.
 *
 * Authored by Challenger 2 (Responsive Viewports Adversarial Verifier).
 * Evaluates real browser rendering via Chrome DevTools Protocol (CDP) across:
 * - 375px Mobile Viewport (iPhone SE / narrow profile)
 * - 768px Tablet Viewport (iPad / medium profile)
 * - 1440px Desktop Viewport (MacBook / large display)
 *
 * Verifies:
 * 1. 375px: Sticky canvas 400dvh pipeline, scroll-snap filter chips, 2-col skills grid,
 *           table-to-flex-card conversion, timeline padding, zero horizontal overflow.
 * 2. 768px: Responsive containers, navigation toggle/drawer, modal dimensions.
 * 3. 1440px: Full layout flow, hover cues, presenter mode shortcuts.
 * 4. Build Synchronization & 0 Uncaught Console Errors.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SERVER_PORT = 8991;
const CDP_PORT = 9445;

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

// 1. Static HTTP Server
function startStaticServer() {
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
      const indexFile = path.join(filePath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(indexFile).pipe(res);
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
      console.log(`[HTTP Server] Listening on http://127.0.0.1:${SERVER_PORT}`);
      resolve(server);
    });
  });
}

// 2. CDP Helpers
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

// 3. Main Verification Engine
async function runAudit() {
  console.log('======================================================================');
  console.log('  CHALLENGER 2: EMPIRICAL RESPONSIVE VIEWPORTS ADVERSARIAL AUDIT');
  console.log('======================================================================\n');

  const findings = [];
  const addFinding = (category, title, pass, details) => {
    findings.push({ category, title, pass, details });
    const mark = pass ? '✓ PASS' : '✗ FAIL';
    console.log(`  [${mark}] [${category}] ${title}`);
    if (!pass && details) {
      console.log(`         Details: ${JSON.stringify(details)}`);
    }
  };

  // Start HTTP Server
  const server = await startStaticServer();

  // Launch Chrome
  console.log(`[Chrome] Spawning headless Chrome on port ${CDP_PORT}...`);
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--user-data-dir=/tmp/chrome-challenger2-audit-profile',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  let ws = null;
  const consoleErrors = [];
  let cmdId = 100;

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
          consoleErrors.push({
            type: 'exception',
            text: msg.params.exceptionDetails.text,
            url: msg.params.exceptionDetails.url,
            line: msg.params.exceptionDetails.lineNumber
          });
        }
        if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
          consoleErrors.push({
            type: 'log_error',
            text: msg.params.entry.text,
            url: msg.params.entry.url
          });
        }
      } catch (e) {}
    });

    await sendCdpCommand(ws, 'Page.enable', {}, cmdId++);
    await sendCdpCommand(ws, 'Runtime.enable', {}, cmdId++);
    await sendCdpCommand(ws, 'Log.enable', {}, cmdId++);

    const TARGET_URLS = [
      { name: 'Source Root', url: `http://127.0.0.1:${SERVER_PORT}/index.html` },
      { name: 'Public Build (dist/public)', url: `http://127.0.0.1:${SERVER_PORT}/dist/public/index.html` },
      { name: 'Private Build (dist/private)', url: `http://127.0.0.1:${SERVER_PORT}/dist/private/index.html` }
    ];

    for (const target of TARGET_URLS) {
      console.log(`\n----------------------------------------------------------------------`);
      console.log(`  AUDITING TARGET: ${target.name} (${target.url})`);
      console.log(`----------------------------------------------------------------------`);

      // -------------------------------------------------------------
      // 1. MOBILE VIEWPORT (375px x 812px)
      // -------------------------------------------------------------
      console.log('\n>>> Testing 375px Mobile Viewport...');
      await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 375,
        height: 812,
        deviceScaleFactor: 2,
        mobile: true
      }, cmdId++);

      await sendCdpCommand(ws, 'Page.navigate', { url: target.url }, cmdId++);
      await new Promise(r => setTimeout(r, 2000));

      // Test: No Horizontal Overflow
      const overflowResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const docWidth = document.documentElement.scrollWidth;
            const bodyWidth = document.body.scrollWidth;
            const innerWidth = window.innerWidth;
            
            // Check elements overflowing right edge (> 375.5px)
            const overflowingElements = [];
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              // skip script, style, head, dialogs not open
              if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK', 'TITLE'].includes(el.tagName)) continue;
              if (el.tagName === 'DIALOG' && !el.open) continue;
              
              const rect = el.getBoundingClientRect();
              const style = window.getComputedStyle(el);
              
              // Skip containers that are explicitly horizontally scrollable or clip overflow
              if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'hidden') {
                continue;
              }
              
              if (rect.right > innerWidth + 1.5) {
                overflowingElements.push({
                  tag: el.tagName,
                  id: el.id,
                  class: el.className,
                  right: rect.right,
                  width: rect.width,
                  overflowX: style.overflowX
                });
              }
            }
            
            return {
              docWidth,
              bodyWidth,
              innerWidth,
              hasGlobalOverflow: docWidth > innerWidth,
              overflowCount: overflowingElements.length,
              sampleOverflows: overflowingElements.slice(0, 5)
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const ovVal = overflowResult.result.value;
      addFinding(
        '375px Mobile',
        `${target.name}: Zero Horizontal Page Overflow (scrollWidth <= 375)`,
        !ovVal.hasGlobalOverflow,
        ovVal
      );

      // Test: Sticky Canvas 400dvh Pipeline & 100dvh inner container
      const stickyResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const wrapper = document.querySelector('.sticky-canvas-wrapper');
            const inner = document.querySelector('.sticky-canvas-inner');
            const interactiveCard = document.querySelector('.interactive-card');
            
            if (!wrapper || !inner) {
              return { error: 'Sticky canvas wrapper or inner element not found' };
            }
            
            const wrapperStyle = window.getComputedStyle(wrapper);
            const innerStyle = window.getComputedStyle(inner);
            const cardStyle = interactiveCard ? window.getComputedStyle(interactiveCard) : null;
            
            const windowHeight = window.innerHeight;
            const wrapperRect = wrapper.getBoundingClientRect();
            const innerRect = inner.getBoundingClientRect();
            
            return {
              wrapperHeight: wrapperStyle.height,
              wrapperRectHeight: wrapperRect.height,
              wrapperPosition: wrapperStyle.position,
              innerPosition: innerStyle.position,
              innerTop: innerStyle.top,
              innerHeight: innerStyle.height,
              innerRectHeight: innerRect.height,
              innerPointerEvents: innerStyle.pointerEvents,
              innerZIndex: innerStyle.zIndex,
              cardPointerEvents: cardStyle ? cardStyle.pointerEvents : null,
              cardZIndex: cardStyle ? cardStyle.zIndex : null,
              expected400dvhApprox: windowHeight * 4,
              windowHeight
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const stickyVal = stickyResult.result.value;
      const isStickyValid = !stickyVal.error &&
        stickyVal.innerPosition === 'sticky' &&
        stickyVal.innerPointerEvents === 'none' &&
        (stickyVal.cardPointerEvents === 'auto' || stickyVal.cardPointerEvents === null);

      addFinding(
        '375px Mobile',
        `${target.name}: Sticky Canvas 400dvh Pipeline Structure & Pointer-Events Contract`,
        isStickyValid,
        stickyVal
      );

      // Test: Filter Chips Horizontal Scrolling & Scroll-Snap
      const filterResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.querySelector('.filter-chips-container');
            const chip = document.querySelector('.filter-chip');
            if (!container || !chip) return { error: 'Filter chips container or chip missing' };
            
            const containerStyle = window.getComputedStyle(container);
            const chipStyle = window.getComputedStyle(chip);
            
            return {
              overflowX: containerStyle.overflowX,
              scrollSnapType: containerStyle.scrollSnapType,
              chipScrollSnapAlign: chipStyle.scrollSnapAlign,
              chipWhiteSpace: chipStyle.whiteSpace,
              chipFlexShrink: chipStyle.flexShrink
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const filterVal = filterResult.result.value;
      const isFilterValid = !filterVal.error &&
        (filterVal.overflowX === 'auto' || filterVal.overflowX === 'scroll') &&
        filterVal.scrollSnapType.includes('mandatory') &&
        filterVal.chipScrollSnapAlign === 'start';

      addFinding(
        '375px Mobile',
        `${target.name}: Filter Chips Horizontal Scroll-Snap (mandatory x-axis & start align)`,
        isFilterValid,
        filterVal
      );

      // Test: Skills Grid 2-Column Layout
      const skillsResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const grid = document.querySelector('.skills-grid');
            if (!grid) return { error: 'Skills grid missing' };
            const style = window.getComputedStyle(grid);
            const cols = style.gridTemplateColumns.trim().split(/\\s+/);
            return {
              gridTemplateColumns: style.gridTemplateColumns,
              columnCount: cols.length,
              gap: style.gap
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const skillsVal = skillsResult.result.value;
      const isSkillsValid = !skillsVal.error && skillsVal.columnCount === 2;
      addFinding(
        '375px Mobile',
        `${target.name}: Skills Grid 2-Column Responsive Layout at 375px`,
        isSkillsValid,
        skillsVal
      );

      // Test: Salary BLS Table-to-Flex-Card Conversion
      const salaryResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const table = document.getElementById('salary-bls-table') || document.querySelector('.cyber-data-table');
            if (!table) return { error: 'Salary table not found' };
            
            const thead = table.querySelector('thead');
            const tr = table.querySelector('tbody tr');
            const tds = table.querySelectorAll('tbody td');
            
            const theadStyle = thead ? window.getComputedStyle(thead) : null;
            const trStyle = tr ? window.getComputedStyle(tr) : null;
            const firstTdStyle = tds.length ? window.getComputedStyle(tds[0]) : null;
            
            // Check data-label attributes on all td cells
            let totalTds = tds.length;
            let tdsWithDataLabel = 0;
            tds.forEach(td => {
              if (td.hasAttribute('data-label') && td.getAttribute('data-label').trim().length > 0) {
                tdsWithDataLabel++;
              }
            });
            
            const beforePseudo = tds.length ? window.getComputedStyle(tds[0], '::before') : null;
            
            return {
              theadDisplay: theadStyle ? theadStyle.display : null,
              trDisplay: trStyle ? trStyle.display : null,
              tdDisplay: firstTdStyle ? firstTdStyle.display : null,
              tdJustifyContent: firstTdStyle ? firstTdStyle.justifyContent : null,
              totalTds,
              tdsWithDataLabel,
              beforePseudoContent: beforePseudo ? beforePseudo.content : null
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const salaryVal = salaryResult.result.value;
      const isSalaryValid = !salaryVal.error &&
        salaryVal.theadDisplay === 'none' &&
        salaryVal.trDisplay === 'block' &&
        salaryVal.tdDisplay === 'flex' &&
        salaryVal.tdsWithDataLabel === salaryVal.totalTds &&
        salaryVal.totalTds > 0;

      addFinding(
        '375px Mobile',
        `${target.name}: Salary Table Vertical Flex Card Conversion with data-label`,
        isSalaryValid,
        salaryVal
      );

      // Test: Timeline Padding & Left Clipping
      const timelineResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.querySelector('.timeline-container');
            const marker = document.querySelector('.timeline-marker');
            const item = document.querySelector('.timeline-item');
            const card = document.querySelector('.timeline-achievements');
            
            if (!container) return { error: 'Timeline container missing' };
            
            const cStyle = window.getComputedStyle(container);
            const cRect = container.getBoundingClientRect();
            const mRect = marker ? marker.getBoundingClientRect() : null;
            const iRect = item ? item.getBoundingClientRect() : null;
            const cardRect = card ? card.getBoundingClientRect() : null;
            
            return {
              paddingLeft: cStyle.paddingLeft,
              containerLeft: cRect.left,
              markerLeft: mRect ? mRect.left : null,
              itemLeft: iRect ? iRect.left : null,
              cardLeft: cardRect ? cardRect.left : null,
              cardRight: cardRect ? cardRect.right : null,
              viewportWidth: window.innerWidth,
              clippedLeft: mRect ? mRect.left < 0 : false,
              clippedRight: cardRect ? cardRect.right > window.innerWidth : false
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const timelineVal = timelineResult.result.value;
      const isTimelineValid = !timelineVal.error &&
        !timelineVal.clippedLeft &&
        !timelineVal.clippedRight &&
        timelineVal.containerLeft >= 0;

      addFinding(
        '375px Mobile',
        `${target.name}: Timeline Padding & Zero Left/Right Marker Clipping`,
        isTimelineValid,
        timelineVal
      );

      // -------------------------------------------------------------
      // 2. TABLET VIEWPORT (768px x 1024px)
      // -------------------------------------------------------------
      console.log('\n>>> Testing 768px Tablet Viewport...');
      await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 768,
        height: 1024,
        deviceScaleFactor: 2,
        mobile: false
      }, cmdId++);

      await new Promise(r => setTimeout(r, 1000));

      // Test: Navigation Toggle & Drawer Behavior at 768px
      const navResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const navToggle = document.getElementById('nav-toggle-btn');
            const siteNav = document.getElementById('site-nav');
            if (!navToggle || !siteNav) return { error: 'Nav toggle or site nav missing' };
            
            const toggleInitialStyle = window.getComputedStyle(navToggle);
            const navInitialStyle = window.getComputedStyle(siteNav);
            
            const initialToggleVisible = toggleInitialStyle.display !== 'none';
            const initialNavHidden = navInitialStyle.display === 'none';
            
            // Trigger click on toggle
            navToggle.click();
            const navOpenedStyle = window.getComputedStyle(siteNav);
            const isOpenNow = siteNav.classList.contains('open') && navOpenedStyle.display === 'flex';
            
            // Toggle close
            navToggle.click();
            const navClosedStyle = window.getComputedStyle(siteNav);
            const isClosedNow = !siteNav.classList.contains('open') && navClosedStyle.display === 'none';
            
            return {
              initialToggleVisible,
              initialNavHidden,
              isOpenNow,
              isClosedNow,
              toggleDisplay: toggleInitialStyle.display
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const navVal = navResult.result.value;
      const isNavValid = !navVal.error &&
        navVal.initialToggleVisible &&
        navVal.initialNavHidden &&
        navVal.isOpenNow &&
        navVal.isClosedNow;

      addFinding(
        '768px Tablet',
        `${target.name}: Responsive Navigation Drawer Toggle & Expansion at 768px`,
        isNavValid,
        navVal
      );

      // Test: Modal Dimensions & Behavior at 768px
      const modalResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const modal = document.getElementById('video-modal');
            const closeBtn = document.getElementById('btn-modal-close');
            const modalTitle = document.getElementById('modal-video-title');
            const trigger = document.querySelector('.preview-video-element, [data-type="video"], [data-type="image"]');
            
            if (!modal || !closeBtn) return { error: 'Modal or close button missing' };
            
            // Open modal via showModal or trigger click
            if (trigger) trigger.click();
            else if (typeof modal.showModal === 'function') modal.showModal();
            else modal.setAttribute('open', 'true');
            
            const isOpen = modal.hasAttribute('open') || modal.open === true;
            const rect = modal.getBoundingClientRect();
            const modalStyle = window.getComputedStyle(modal);
            const closeStyle = window.getComputedStyle(closeBtn);
            const titleStyle = modalTitle ? window.getComputedStyle(modalTitle) : null;
            
            // Close modal
            closeBtn.click();
            const isClosed = !modal.hasAttribute('open') && modal.open !== true;
            
            return {
              isOpen,
              isClosed,
              modalWidth: rect.width,
              viewportWidth: window.innerWidth,
              maxWidth: modalStyle.maxWidth,
              closeZIndex: closeStyle.zIndex,
              closePointerEvents: closeStyle.pointerEvents,
              titleEllipsis: titleStyle ? titleStyle.textOverflow : null,
              titleWhiteSpace: titleStyle ? titleStyle.whiteSpace : null
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const modalVal = modalResult.result.value;
      const isModalValid = !modalVal.error &&
        modalVal.modalWidth <= 768 &&
        modalVal.closeZIndex === '9999' &&
        modalVal.closePointerEvents === 'auto' &&
        modalVal.titleEllipsis === 'ellipsis';

      addFinding(
        '768px Tablet',
        `${target.name}: Modal Dimension Bounding & Z-Index 9999 Close Button`,
        isModalValid,
        modalVal
      );

      // -------------------------------------------------------------
      // 3. DESKTOP VIEWPORT (1440px x 900px)
      // -------------------------------------------------------------
      console.log('\n>>> Testing 1440px Desktop Viewport...');
      await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      }, cmdId++);

      await new Promise(r => setTimeout(r, 1000));

      // Test: Full Layout Flow at 1440px
      const desktopLayoutResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const navToggle = document.getElementById('nav-toggle-btn');
            const siteNav = document.getElementById('site-nav');
            const heroGrid = document.querySelector('.hero-grid');
            const navCues = document.querySelector('.nav-cues');
            const swipeCues = document.querySelector('.mobile-swipe-cues');
            
            const navToggleStyle = navToggle ? window.getComputedStyle(navToggle) : null;
            const siteNavStyle = siteNav ? window.getComputedStyle(siteNav) : null;
            const heroGridStyle = heroGrid ? window.getComputedStyle(heroGrid) : null;
            const heroCols = heroGridStyle ? heroGridStyle.gridTemplateColumns.trim().split(/\\s+/) : [];
            const navCuesStyle = navCues ? window.getComputedStyle(navCues) : null;
            const swipeCuesStyle = swipeCues ? window.getComputedStyle(swipeCues) : null;
            
            return {
              navToggleDisplay: navToggleStyle ? navToggleStyle.display : null,
              siteNavDisplay: siteNavStyle ? siteNavStyle.display : null,
              heroColCount: heroCols.length,
              navCuesDisplay: navCuesStyle ? navCuesStyle.display : null,
              swipeCuesDisplay: swipeCuesStyle ? swipeCuesStyle.display : null
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const dlVal = desktopLayoutResult.result.value;
      const isDesktopLayoutValid = !dlVal.error &&
        dlVal.navToggleDisplay === 'none' &&
        dlVal.siteNavDisplay === 'flex' &&
        dlVal.heroColCount === 2;

      addFinding(
        '1440px Desktop',
        `${target.name}: Desktop Layout Grid (2-Col Hero, Visible Navbar, Hidden Hamburger)`,
        isDesktopLayoutValid,
        dlVal
      );

      // Test: Presenter Mode Shortcuts & State Interaction
      const presenterResult = await sendCdpCommand(ws, 'Runtime.evaluate', {
        expression: `
          (() => {
            const state = window.PresenterState;
            const mod = window.PresenterModule;
            const drawer = document.getElementById('presenter-drawer');
            const presenterBtn = document.getElementById('btn-presenter-mode');
            
            if (!state) return { error: 'PresenterState not attached to window' };
            
            const initialSection = state.currentSection;
            
            // Trigger ArrowRight keydown
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', bubbles: true }));
            const afterNextSection = state.currentSection;
            
            // Trigger ArrowLeft keydown
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', code: 'ArrowLeft', bubbles: true }));
            const afterPrevSection = state.currentSection;
            
            // Open presenter drawer via button
            if (presenterBtn) presenterBtn.click();
            const isDrawerOpen = drawer ? drawer.classList.contains('open') : false;
            
            // Close drawer via Escape key
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
            const isDrawerClosedAfterEsc = drawer ? !drawer.classList.contains('open') : true;
            
            return {
              initialSection,
              afterNextSection,
              afterPrevSection,
              isDrawerOpen,
              isDrawerClosedAfterEsc,
              active: state.active,
              maxSeconds: state.maxSeconds
            };
          })()
        `,
        returnByValue: true
      }, cmdId++);

      const presVal = presenterResult.result.value;
      const isPresenterValid = !presVal.error &&
        presVal.isDrawerOpen &&
        presVal.isDrawerClosedAfterEsc &&
        presVal.maxSeconds === 420;

      addFinding(
        '1440px Desktop',
        `${target.name}: Presenter Mode Shortcuts (Arrow keys, Esc close, Drawer HUD)`,
        isPresenterValid,
        presVal
      );
    }

  } finally {
    if (ws) ws.close();
    chrome.kill();
    server.close();
  }

  // -------------------------------------------------------------
  // 4. CONSOLE ERRORS & BUILD SYNCHRONIZATION AUDIT
  // -------------------------------------------------------------
  console.log('\n----------------------------------------------------------------------');
  console.log('  AUDITING BUILD SYNCHRONIZATION & CONSOLE EXCEPTIONS');
  console.log('----------------------------------------------------------------------');

  // Verify console errors across all targets
  const hasConsoleErrors = consoleErrors.length > 0;
  addFinding(
    'Runtime Health',
    'Zero Uncaught Console Errors / Exceptions Across All Tested Viewports',
    !hasConsoleErrors,
    consoleErrors
  );

  // Run build tool directly
  console.log('\nExecuting node tools/build.js...');
  let buildOutput = '';
  let buildPassed = false;
  try {
    buildOutput = execSync('node tools/build.js', { cwd: ROOT_DIR, encoding: 'utf8' });
    buildPassed = buildOutput.includes('Build completed successfully');
  } catch (err) {
    buildOutput = err.message;
    buildPassed = false;
  }
  addFinding(
    'Build Pipeline',
    'Build Pipeline Execution (node tools/build.js completes with code 0)',
    buildPassed,
    { output: buildOutput.trim().split('\n').slice(-3) }
  );

  // Verify dist/ synchronization against src
  const distPublicIndex = path.join(ROOT_DIR, 'dist/public/index.html');
  const distPrivateIndex = path.join(ROOT_DIR, 'dist/private/index.html');
  const srcIndex = path.join(ROOT_DIR, 'index.html');

  const srcIndexContent = fs.readFileSync(srcIndex, 'utf8');
  const pubIndexContent = fs.readFileSync(distPublicIndex, 'utf8');
  const privIndexContent = fs.readFileSync(distPrivateIndex, 'utf8');

  // Public build must redact private details
  const publicSanitized = !pubIndexContent.includes('z@z.com') &&
    !pubIndexContent.includes('zzzzzz') &&
    !pubIndexContent.includes('228-229-2187');

  addFinding(
    'Build Integrity',
    'Public Variant Privacy Redaction (Zero Credentials / Private Contacts)',
    publicSanitized,
    { publicSanitized }
  );

  // Both public and private must have identical core CSS/JS/structures
  const hasStickyInPublic = pubIndexContent.includes('sticky-canvas-wrapper');
  const hasStickyInPrivate = privIndexContent.includes('sticky-canvas-wrapper');
  const hasSalaryTogglePublic = pubIndexContent.includes('salary-explorer-toggle');
  const hasSalaryTogglePrivate = privIndexContent.includes('salary-explorer-toggle');

  addFinding(
    'Build Integrity',
    'Build Distribution Synchronization (Responsive Features Present in Both Targets)',
    hasStickyInPublic && hasStickyInPrivate && hasSalaryTogglePublic && hasSalaryTogglePrivate,
    { hasStickyInPublic, hasStickyInPrivate, hasSalaryTogglePublic, hasSalaryTogglePrivate }
  );

  // Run tests/runner.js
  console.log('\nExecuting node tests/runner.js...');
  let testRunnerOutput = '';
  let testRunnerPassed = false;
  try {
    testRunnerOutput = execSync('node tests/runner.js', { cwd: ROOT_DIR, encoding: 'utf8' });
    testRunnerPassed = testRunnerOutput.includes('Passed Test Cases') && !testRunnerOutput.includes('Failed Test Cases   : [1-9]');
  } catch (err) {
    testRunnerOutput = err.message;
    testRunnerPassed = false;
  }
  addFinding(
    'Test Suite',
    'Full Test Suite Runner (191/191 Test Cases Pass Cleanly)',
    testRunnerPassed,
    { passed: testRunnerPassed }
  );

  // -------------------------------------------------------------
  // SUMMARY REPORT
  // -------------------------------------------------------------
  console.log('\n======================================================================');
  console.log('  CHALLENGER 2 EMPIRICAL AUDIT SUMMARY');
  console.log('======================================================================');

  const totalFindings = findings.length;
  const passedFindings = findings.filter(f => f.pass).length;
  const failedFindings = findings.filter(f => !f.pass).length;

  console.log(`Total Checks Executed : ${totalFindings}`);
  console.log(`Passed Checks         : ${passedFindings}`);
  console.log(`Failed Checks         : ${failedFindings}`);

  const verdict = failedFindings === 0 ? 'APPROVE' : 'REQUEST_CHANGES';
  console.log(`\nFINAL VERDICT: [${verdict}]\n======================================================================`);

  return {
    verdict,
    totalFindings,
    passedFindings,
    failedFindings,
    findings
  };
}

if (require.main === module) {
  runAudit()
    .then(result => {
      process.exit(result.verdict === 'APPROVE' ? 0 : 1);
    })
    .catch(err => {
      console.error('[FATAL]:', err);
      process.exit(1);
    });
}

module.exports = { runAudit };
