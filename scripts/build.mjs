import { execSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const preview = process.argv.includes("--preview");

export function injectNoindex(html) {
  if (html.includes('name="robots"')) {
    return html;
  }
  return html.replace("</head>", '  <meta name="robots" content="noindex, nofollow">\n</head>');
}

export function previewConfig(hosting) {
  const next = structuredClone(hosting);
  const headers = next.hosting.headers.map((block) => {
    if (block.source !== "**") {
      return block;
    }
    return {
      ...block,
      headers: [
        ...block.headers,
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
      ],
    };
  });
  next.hosting.headers = headers;
  return next;
}

function copySite() {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  cpSync(path.join(root, "site"), dist, { recursive: true });
  cpSync(path.join(root, "brand"), path.join(dist, "brand"), { recursive: true });
  cpSync(path.join(root, "brand", "icons"), path.join(dist, "icons"), { recursive: true });
  cpSync(path.join(root, "brand", "icons", "favicon.ico"), path.join(dist, "favicon.ico"));
  const gsapDist = path.join(root, "node_modules", "gsap", "dist");
  if (!existsSync(path.join(gsapDist, "gsap.min.js"))) {
    throw new Error("gsap is not installed. From the repository root run npm install.");
  }
  const vendor = path.join(dist, "vendor", "gsap");
  mkdirSync(vendor, { recursive: true });
  cpSync(path.join(gsapDist, "gsap.min.js"), path.join(vendor, "gsap.min.js"));
  cpSync(path.join(gsapDist, "ScrollTrigger.min.js"), path.join(vendor, "ScrollTrigger.min.js"));
  const license = path.join(root, "node_modules", "gsap", "LICENSE");
  if (existsSync(license)) {
    cpSync(license, path.join(vendor, "LICENSE"));
  }
}

function writeVersion() {
  const sha = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  const body = {
    sha,
    builtAt: new Date().toISOString(),
    app: "maqkrs-career",
  };
  writeFileSync(path.join(dist, "version.json"), `${JSON.stringify(body, null, 2)}\n`);
}

function applyPreview() {
  const pages = [
    path.join(dist, "index.html"),
    path.join(dist, "404.html"),
    path.join(dist, "sources", "index.html"),
  ];
  for (const page of pages) {
    writeFileSync(page, injectNoindex(readFileSync(page, "utf8")));
  }
  writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nDisallow: /\n");
  const hosting = JSON.parse(readFileSync(path.join(root, "firebase.json"), "utf8"));
  writeFileSync(path.join(root, "firebase.preview.json"), `${JSON.stringify(previewConfig(hosting), null, 2)}\n`);
}

function main() {
  copySite();
  writeVersion();
  if (preview) {
    applyPreview();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
