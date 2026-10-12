import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\uFE0F\u2705\u2714\u2716\u274C\u274E]/u;
const skip = /(\.png|\.jpe?g|\.webp|\.gif|\.ico|\.woff2?|\.mp4|\.webm|\.pdf|\.lock)$/i;

const tracked = execSync("git ls-files --cached --others --exclude-standard", { encoding: "utf8" })
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .filter((file) => !skip.test(file))
  .filter((file) => !file.startsWith("brand/"))
  .filter((file) => !file.startsWith("vendor/"))
  .filter((file) => file !== "package-lock.json");

const hits = [];
for (const file of tracked) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const match = emoji.exec(text);
  if (match) {
    const line = text.slice(0, match.index).split("\n").length;
    hits.push(`${file}:${line} U+${match[0].codePointAt(0).toString(16).toUpperCase()}`);
  }
}

if (hits.length > 0) {
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log(`emoji ok (${tracked.length} files)`);
