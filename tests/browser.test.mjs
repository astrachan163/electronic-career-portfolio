import assert from "node:assert/strict";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import test from "node:test";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const dist = path.join(process.cwd(), "dist");
const chrome = process.env.CHROME_PATH
  || (existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain",
  ".webmanifest": "application/manifest+json",
};

function resolveFile(pathname) {
  const rel = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = [
    path.resolve(dist, rel),
    path.resolve(dist, rel, "index.html"),
    path.resolve(dist, `${rel}.html`),
  ];
  for (const candidate of candidates) {
    if (candidate !== dist && !candidate.startsWith(`${dist}${path.sep}`)) {
      continue;
    }
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function startServer() {
  const server = createServer((req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    const file = resolveFile(url.pathname);
    if (!file) {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      createReadStream(path.join(dist, "404.html")).pipe(res);
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

async function axeSerious(page) {
  const results = await new AxeBuilder({ page }).analyze();
  const bad = results.violations.filter((item) => item.impact === "critical" || item.impact === "serious");
  assert.deepEqual(bad.map((item) => item.id), []);
}

test("landing, sources, and 404 have no serious axe violations", { timeout: 120000 }, async (t) => {
  if (!chrome && process.env.CI !== "true") {
    t.skip("Chrome is not installed");
    return;
  }
  const { server, port } = await startServer();
  const browser = await chromium.launch({
    ...(chrome ? { executablePath: chrome } : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await desktop.newPage();
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    await page.waitForSelector("h1");
    assert.match(await page.locator("h1").innerText(), /Andrew Strachan/);
    assert.equal(await page.locator("[data-skip-intro]").count(), 1);
    await page.waitForSelector("[data-motion-pause]:not([hidden])");
    const pauseBox = await page.locator("[data-motion-pause]").boundingBox();
    assert.ok(pauseBox && pauseBox.width >= 44 && pauseBox.height >= 44);
    await page.locator("[data-motion-pause]").click();
    assert.equal(await page.locator("video").evaluate((node) => node.paused), true);
    assert.equal(await page.locator("img[src*='cubebot']").count(), 0);
    assert.equal(await page.locator(".logo-slot").count(), 1);
    assert.equal(await page.locator("img[src*='wordmark']").count(), 0);
    assert.equal(await page.locator("img[src*='circuit-m']").count(), 0);
    await axeSerious(page);
    const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(wide < 2, `desktop overflow ${wide}`);

    await page.goto(`http://127.0.0.1:${port}/sources`, { waitUntil: "networkidle" });
    await axeSerious(page);
    await page.goto(`http://127.0.0.1:${port}/missing-page`, { waitUntil: "networkidle" });
    await axeSerious(page);
    assert.match(await page.locator("h1").innerText(), /not on this site/);
    assert.equal(await page.locator("img[src*='cubebot']").count(), 0);
    await desktop.close();

    const phone = await browser.newContext({ viewport: { width: 430, height: 900 } });
    const narrow = await phone.newPage();
    await narrow.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    const overflow = await narrow.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow < 2, `430 overflow ${overflow}`);
    await axeSerious(narrow);
    await phone.close();

    const still = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const reduced = await still.newPage();
    await reduced.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    await reduced.waitForSelector("video");
    assert.equal(await reduced.locator("html").getAttribute("data-motion"), "video");
    assert.equal(await reduced.locator("html").getAttribute("data-soften"), "true");
    const current = await reduced.locator("[data-intro-poster]").evaluate((img) => img.currentSrc);
    assert.equal(current.includes("still-reduced-motion"), false);
    await reduced.waitForSelector("[data-motion-pause]:not([hidden])");
    await axeSerious(reduced);
    await still.close();
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
