import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { injectNoindex, previewConfig } from "../scripts/build.mjs";

const root = process.cwd();
const dist = path.join(root, "dist");

const legal = [
  "https://www.nonartificialsi.com/privacy",
  "https://www.nonartificialsi.com/terms",
  "https://www.nonartificialsi.com/accessibility",
  "https://www.nonartificialsi.com/ai",
  "https://www.nonartificialsi.com/credits",
];

const liveLinks = [
  "https://d1puxvoeqwchkj.cloudfront.net/",
  "https://cs646-sanctum-world.firebaseapp.com/",
  "https://cs646-sanctum-astrachan.firebaseapp.com/",
  "https://cs646-sanctum-astrachan--midterm-aogm2izm.web.app/#/",
  "https://github.com/astrachan163/MaqkrsTutor-public",
  "https://adaptivehs-v2.firebaseapp.com/",
  "https://d3jeotfnsm148g.cloudfront.net/work/adaptivehs/",
  "https://quantum-universe-3d.web.app/",
  "https://maqkrs-command-center-i.firebaseapp.com/",
  "https://d3jeotfnsm148g.cloudfront.net/",
  "https://coastal-speech-co-fl.firebaseapp.com/",
  "https://aether-apothecary.vercel.app/",
  "https://networking-testy.firebaseapp.com/",
  "https://networking-security-cs623-hub.firebaseapp.com/",
  "https://practice-questions-networking.firebaseapp.com/",
  "https://networking-midterm.web.app/studyguide4.html",
  "https://networking-exam-60418.web.app/",
  "https://network-security-study.firebaseapp.com/",
  "https://ns-demos-34811.firebaseapp.com/",
  "https://cyberriskmanagement-testy.firebaseapp.com/",
  "https://cs203-java-studyguide.firebaseapp.com/",
  "https://cs203-java-practice1.firebaseapp.com/",
  "https://cs203-exam-simulator.firebaseapp.com/",
  "https://cs-203-midterm.web.app/practice_test_labs.html",
  "https://cs-203-midterm.web.app/practice_test.html",
  "https://secure-connector-buddy.lovable.app/",
  "https://andy-sg-ns.firebaseapp.com/",
  "https://github.com/astrachan163",
  "https://www.nonartificialsi.com/",
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

test("hosting target is only maqkrs-career", () => {
  const firebase = JSON.parse(readFileSync(path.join(root, "firebase.json"), "utf8"));
  const rc = JSON.parse(readFileSync(path.join(root, ".firebaserc"), "utf8"));
  assert.equal(firebase.hosting.target, "maqkrs-career");
  assert.equal(firebase.hosting.public, "dist");
  assert.equal(firebase.functions, undefined);
  assert.equal(firebase.firestore, undefined);
  assert.deepEqual(rc.targets["maqkrs-command-center-i"].hosting["maqkrs-career"], ["maqkrs-career"]);
  const hostingNames = JSON.stringify(rc.targets);
  assert.equal(hostingNames.includes("adaptivehs"), false);
  assert.equal(Object.keys(rc.targets["maqkrs-command-center-i"].hosting).length, 1);
});

test("security headers omit unsafe script and style sources", () => {
  const firebase = JSON.parse(readFileSync(path.join(root, "firebase.json"), "utf8"));
  const shared = firebase.hosting.headers.find((block) => block.source === "**");
  const csp = shared.headers.find((header) => header.key === "Content-Security-Policy").value;
  assert.equal(csp.includes("unsafe-inline"), false);
  assert.equal(csp.includes("unsafe-eval"), false);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /script-src 'self'/);
  assert.match(csp, /style-src 'self'/);
  const keys = shared.headers.map((header) => header.key);
  for (const key of [
    "X-Content-Type-Options",
    "Referrer-Policy",
    "X-Frame-Options",
    "Strict-Transport-Security",
    "Permissions-Policy",
  ]) {
    assert.equal(keys.includes(key), true, key);
  }
  assert.equal(shared.headers.find((header) => header.key === "Referrer-Policy").value, "strict-origin-when-cross-origin");
  assert.equal(shared.headers.find((header) => header.key === "X-Content-Type-Options").value, "nosniff");
  const version = firebase.hosting.headers.find((block) => block.source === "/version.json");
  assert.equal(
    version.headers.find((header) => header.key === "Access-Control-Allow-Origin").value,
    "https://command.nonartificialsi.com",
  );
  assert.equal(JSON.stringify(firebase).includes("X-Robots-Tag"), false);
});

test("preview config adds the robots header without changing the site", () => {
  const firebase = JSON.parse(readFileSync(path.join(root, "firebase.json"), "utf8"));
  const preview = previewConfig(firebase);
  assert.equal(preview.hosting.target, "maqkrs-career");
  const shared = preview.hosting.headers.find((block) => block.source === "**");
  assert.equal(shared.headers.some((header) => header.key === "X-Robots-Tag" && header.value === "noindex, nofollow"), true);
  const html = injectNoindex("<html><head><title>t</title></head><body></body></html>");
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});

test("there is no functions codebase to prefix", () => {
  assert.equal(statExists(path.join(root, "functions")), false);
  const tracked = execSync("git ls-files functions", { encoding: "utf8" }).trim();
  assert.equal(tracked, "");
});

test("env sentinel stays empty", () => {
  const tracked = execSync("git ls-files", { encoding: "utf8" });
  assert.equal(tracked.includes(".env\n") || tracked.startsWith(".env"), false);
  assert.equal(tracked.includes("ENV_SENTINEL_DO_NOT_SHIP"), false);
  const example = readFileSync(path.join(root, ".env.example"), "utf8");
  assert.equal(example.includes("AIza"), false);
  assert.equal(example.includes("ENV_SENTINEL_DO_NOT_SHIP"), false);
});

test("built pages keep legal links, chapters, and self-hosted brand files", () => {
  const pages = [
    path.join(dist, "index.html"),
    path.join(dist, "404.html"),
    path.join(dist, "sources", "index.html"),
  ];
  assert.ok(pages.length >= 3);
  const hotlink = /(?:https?:)?\/\/(?:www\.)?nonartificialsi\.com\/brand\//;
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    for (const href of legal) {
      assert.equal(html.includes(href), true, `${page} missing ${href}`);
    }
    assert.match(html, /https:\/\/nonartificialsi\.com\//);
    assert.equal(html.includes("style="), false, page);
    assert.equal(html.includes("onclick="), false, page);
    assert.equal(/<script(?![^>]*\ssrc=)/.test(html), false, page);
    assert.equal(hotlink.test(html), false, page);
  }
  const home = readFileSync(path.join(dist, "index.html"), "utf8");
  for (const id of ["about", "experience", "projects", "contact"]) {
    assert.match(home, new RegExp(`id="${id}"`));
  }
  for (const href of liveLinks) {
    assert.equal(home.includes(href), true, href);
  }
  assert.match(home, /fetchpriority="high"/);
  assert.match(home, /prefers-reduced-motion: reduce/);
  assert.match(home, /data-skip-intro/);
});

test("dist has no secret markers and does not hotlink the kit", () => {
  const needles = ["AIza", "sk_", "sk-", "-----BEGIN", "zzzzzz"];
  const hotlink = /(?:https?:)?\/\/(?:www\.)?nonartificialsi\.com\/brand\//;
  const files = walk(dist).filter((file) => !file.includes(`${path.sep}vendor${path.sep}`));
  for (const file of files) {
    if (/\.(png|jpe?g|webp|gif|ico|woff2|mp4|webm)$/i.test(file)) {
      continue;
    }
    const text = readFileSync(file, "utf8");
    for (const needle of needles) {
      assert.equal(text.includes(needle), false, `${file} contains ${needle}`);
    }
    if (/\.(html|css|js|json|txt|webmanifest)$/i.test(file)) {
      assert.equal(hotlink.test(text), false, file);
    }
  }
});

test("version.json names this app and a sha", () => {
  const version = JSON.parse(readFileSync(path.join(dist, "version.json"), "utf8"));
  assert.match(version.sha, /^[0-9a-f]{40}$/);
  assert.equal(version.app, "maqkrs-career");
  assert.equal(Number.isNaN(Date.parse(version.builtAt)), false);
});

test("gsap scroll plugin is vendored without eval", () => {
  const gsap = readFileSync(path.join(dist, "vendor", "gsap", "gsap.min.js"), "utf8");
  const scroll = readFileSync(path.join(dist, "vendor", "gsap", "ScrollTrigger.min.js"), "utf8");
  assert.equal(gsap.includes("eval("), false);
  assert.equal(scroll.includes("eval("), false);
});

function statExists(file) {
  try {
    statSync(file);
    return true;
  } catch {
    return false;
  }
}
