import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const approved = JSON.parse(readFileSync(path.join(root, "tests", "icon-hashes.json"), "utf8"));

function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

test("icon files match the approved MQ mark hashes", () => {
  const slot = path.join(root, "brand", "icons");
  const present = readdirSync(slot).filter((name) => /\.(png|ico|svg)$/i.test(name)).sort();
  assert.deepEqual(present, Object.keys(approved).sort());
  for (const name of present) {
    assert.equal(sha256(path.join(slot, name)), approved[name], name);
    const built = path.join(root, "dist", "icons", name);
    assert.equal(sha256(built), approved[name], `dist ${name}`);
  }
  assert.equal(sha256(path.join(root, "dist", "favicon.ico")), approved["favicon.ico"]);
  const svg = readFileSync(path.join(slot, "favicon.svg"), "utf8");
  assert.equal(svg.includes("#0b111a"), true);
  assert.equal(svg.includes("#e8dcc0"), true);
});
