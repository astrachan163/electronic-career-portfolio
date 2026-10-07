#!/usr/bin/env node

/**
 * tools/capture-responsive-screenshots.js
 * Captures pixel-perfect responsive screenshots of the live deployed portfolio
 * (https://astrachan163.github.io/electronic-career-portfolio/)
 * at Mobile (375px) and Desktop (1440px) viewports via Google Chrome CDP.
 */

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT_DIR, 'screenshots');
const DIST_SCREENSHOT_DIR = path.join(ROOT_DIR, 'dist/screenshots');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEBUG_PORT = 9338;
const LIVE_URL = process.env.TARGET_URL || 'https://astrachan163.github.io/electronic-career-portfolio/';

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
      port: DEBUG_PORT,
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
        // ignore other messages
      }
    };
    ws.addEventListener('message', handleMessage);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function captureViewport(ws, config) {
  const { width, height, isMobile, filename, scrollToId, customScroll, title } = config;
  console.log(`\nCapturing [${title}]: ${width}x${height} -> ${filename}...`);

  let cmdId = 1;

  // 1. Set emulation device metrics
  await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 2,
    mobile: isMobile
  }, cmdId++);

  // 2. Enable Page and Runtime
  await sendCdpCommand(ws, 'Page.enable', {}, cmdId++);
  await sendCdpCommand(ws, 'Runtime.enable', {}, cmdId++);

  // 3. Navigate
  const navUrl = `${LIVE_URL}?v=${Date.now()}`;
  await sendCdpCommand(ws, 'Page.navigate', { url: navUrl }, cmdId++);

  // Wait for page load and fonts/images
  await new Promise(r => setTimeout(r, 2500));

  // Ensure scroll animation classes are fully visible for clean screenshot
  await sendCdpCommand(ws, 'Runtime.evaluate', {
    expression: `
      document.querySelectorAll('.animate-on-scroll, .glass-card, .pd-card').forEach(el => {
        el.classList.add('is-visible', 'animated');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      ${customScroll ? customScroll : (scrollToId ? `document.getElementById('${scrollToId}')?.scrollIntoView({ behavior: 'instant', block: 'start' });` : 'window.scrollTo(0, 0);')}
    `
  }, cmdId++);

  await new Promise(r => setTimeout(r, 1000));

  // 4. Capture screenshot
  const result = await sendCdpCommand(ws, 'Page.captureScreenshot', {
    format: 'png',
    fromSurface: true
  }, cmdId++);

  const buffer = Buffer.from(result.data, 'base64');
  const outPath = path.join(SCREENSHOT_DIR, filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`  ✓ Saved screenshot: ${path.relative(ROOT_DIR, outPath)} (${buffer.length} bytes)`);

  // Also copy to dist/screenshots/
  const distOutPath = path.join(DIST_SCREENSHOT_DIR, filename);
  fs.writeFileSync(distOutPath, buffer);
  console.log(`  ✓ Copied to: ${path.relative(ROOT_DIR, distOutPath)}`);
}

async function main() {
  console.log('======================================================================');
  console.log('  Capturing Responsive Live Portfolio Screenshots (375px & 1440px)');
  console.log('======================================================================');

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
  if (!fs.existsSync(DIST_SCREENSHOT_DIR)) {
    fs.mkdirSync(DIST_SCREENSHOT_DIR, { recursive: true });
  }

  console.log(`Launching headless Chrome on port ${DEBUG_PORT}...`);
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--user-data-dir=/tmp/chrome-screenshot-audit-profile',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const version = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
    console.log(`Connected to Chrome version: ${version.Browser}`);

    const newTab = await createTab();
    const wsUrl = newTab.webSocketDebuggerUrl;
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    // 1. Desktop Hero (1440px)
    await captureViewport(ws, {
      width: 1440,
      height: 900,
      isMobile: false,
      filename: 'live_desktop_1440px.png',
      scrollToId: null,
      title: 'Desktop 1440px (Hero & Shell)'
    });

    // 2. Desktop Professional Development (1440px)
    await captureViewport(ws, {
      width: 1440,
      height: 900,
      isMobile: false,
      filename: 'live_pd_desktop_1440px.png',
      scrollToId: 'development',
      title: 'Desktop 1440px (Professional Development)'
    });

    // 3. Tablet Hero (768px)
    await captureViewport(ws, {
      width: 768,
      height: 1024,
      isMobile: false,
      filename: 'live_tablet_768px.png',
      scrollToId: null,
      title: 'Tablet 768px (Hero & Shell)'
    });

    // 4. Tablet Professional Development (768px)
    await captureViewport(ws, {
      width: 768,
      height: 1024,
      isMobile: false,
      filename: 'live_pd_tablet_768px.png',
      scrollToId: 'development',
      title: 'Tablet 768px (Professional Development)'
    });

    // 5. Tablet Professional Development Evidence (768px)
    await captureViewport(ws, {
      width: 768,
      height: 1024,
      isMobile: false,
      filename: 'live_tablet_pd_evidence_768px.png',
      scrollToId: 'development',
      customScroll: "document.querySelector('.pd-grid')?.scrollIntoView({ behavior: 'instant', block: 'center' });",
      title: 'Tablet 768px (Professional Development Evidence)'
    });

    // 6. Mobile Hero (375px)
    await captureViewport(ws, {
      width: 375,
      height: 812,
      isMobile: true,
      filename: 'live_mobile_375px.png',
      scrollToId: null,
      title: 'Mobile 375px (Hero & Shell)'
    });

    // 7. Mobile Professional Development (375px)
    await captureViewport(ws, {
      width: 375,
      height: 812,
      isMobile: true,
      filename: 'live_pd_mobile_375px.png',
      scrollToId: 'development',
      title: 'Mobile 375px (Professional Development)'
    });

    // 8. Mobile Professional Development Evidence (375px)
    await captureViewport(ws, {
      width: 375,
      height: 812,
      isMobile: true,
      filename: 'live_mobile_pd_evidence_375px.png',
      scrollToId: 'development',
      customScroll: "document.querySelector('.pd-grid')?.scrollIntoView({ behavior: 'instant', block: 'center' });",
      title: 'Mobile 375px (Professional Development Evidence)'
    });

    // 9. Desktop Professional Development Evidence (1440px)
    await captureViewport(ws, {
      width: 1440,
      height: 900,
      isMobile: false,
      filename: 'live_desktop_pd_evidence_1440px.png',
      scrollToId: 'development',
      customScroll: "document.querySelector('.pd-grid')?.scrollIntoView({ behavior: 'instant', block: 'center' });",
      title: 'Desktop 1440px (Professional Development Evidence)'
    });

    ws.close();
  } finally {
    chrome.kill();
  }

  console.log('\n======================================================================');
  console.log('All responsive screenshots captured and saved successfully.');
  console.log('======================================================================');
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
