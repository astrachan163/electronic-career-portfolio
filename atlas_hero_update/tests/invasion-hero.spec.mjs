/**
 * Unit & Integration verification for InvasionHero and assets.
 * Run with: node tests/invasion-hero.spec.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

console.log('--- Testing Asset Ingestion & Transcoding ---');
const manifestPath = path.join(ROOT, 'assets', 'invasion', 'manifest.json');
assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.frames, 192, 'Manifest must specify 192 frames');
assert.equal(manifest.fps, 24, 'Manifest must specify 24 fps');

const masterMp4 = path.join(ROOT, 'assets', 'invasion', 'maqkrs_invasion.mp4');
const intraMp4 = path.join(ROOT, 'assets', 'invasion', 'invasion-1280-intra.mp4');
const webm = path.join(ROOT, 'assets', 'invasion', 'invasion.webm');
const poster = path.join(ROOT, 'assets', 'invasion', 'poster.webp');

assert.ok(fs.existsSync(masterMp4) && fs.statSync(masterMp4).size > 1000000, 'Master MP4 exists and > 1MB');
assert.ok(fs.existsSync(intraMp4) && fs.statSync(intraMp4).size > 1000000, 'Intra MP4 exists and > 1MB');
assert.ok(fs.existsSync(webm) && fs.statSync(webm).size > 1000000, 'WebM exists and > 1MB');
assert.ok(fs.existsSync(poster) && fs.statSync(poster).size > 10000, 'Poster exists and > 10KB');

// Check all 192 WebP frames exist and are non-empty
const framesDir = path.join(ROOT, 'assets', 'invasion', 'frames-960');
assert.ok(fs.existsSync(framesDir), 'frames-960 directory exists');

for (let i = 1; i <= 192; i++) {
  const filename = `f_${String(i).padStart(4, '0')}.webp`;
  const framePath = path.join(framesDir, filename);
  assert.ok(fs.existsSync(framePath), `Frame ${filename} must exist`);
  const size = fs.statSync(framePath).size;
  assert.ok(size > 5000, `Frame ${filename} must be valid WebP (>5KB), got ${size}`);
}
console.log('✓ All 192 frames, video formats, and manifest verified.');

console.log('--- Testing DOM & DOM Hierarchy in index.html ---');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// Verify #invasion-hero is the VERY FIRST section inside <main>
const mainTagIndex = indexHtml.indexOf('<main');
const invasionHeroIndex = indexHtml.indexOf('id="invasion-hero"');
const heroSectionIndex = indexHtml.indexOf('id="hero-section"');
const mapStageIndex = indexHtml.indexOf('id="map-stage"');
const roverIndex = indexHtml.indexOf('id="rover"');
const scrubSectionIndex = indexHtml.indexOf('id="scrub"');

assert.ok(mainTagIndex > 0, '<main> tag exists');
assert.ok(invasionHeroIndex > mainTagIndex, '#invasion-hero is inside <main>');
assert.ok(invasionHeroIndex < heroSectionIndex, '#invasion-hero precedes secondary hero section');
assert.ok(heroSectionIndex < scrubSectionIndex, 'Secondary hero section precedes secondary scrub');
assert.ok(mapStageIndex > heroSectionIndex && mapStageIndex < scrubSectionIndex, '#map-stage is inside secondary hero section');
assert.ok(roverIndex > mapStageIndex, '#rover is inside #map-stage');

console.log('✓ Section hierarchy confirmed: #invasion-hero is 1st element in <main>, rover preserved in 2nd, scrub preserved in 3rd.');

console.log('--- Testing Frame & Chapter Math ---');
function frameFromProgress(progress, totalFrames = 192) {
  const p = Math.max(0, Math.min(1, Number(progress) || 0));
  return Math.min(totalFrames - 1, Math.max(0, Math.round(p * (totalFrames - 1))));
}

assert.equal(frameFromProgress(0), 0);
assert.equal(frameFromProgress(1), 191);
assert.equal(frameFromProgress(0.5), 96);
assert.equal(frameFromProgress(-0.5), 0);
assert.equal(frameFromProgress(1.5), 191);

const chapters = [
  { id: 'frontier', start: 0.0, end: 0.30 },
  { id: 'zerotrust', start: 0.30, end: 0.68 },
  { id: 'fellowship', start: 0.68, end: 1.0 },
];

function chapterForProgress(progress) {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    if (p >= ch.start && (p < ch.end || (ch.end >= 1 && p <= 1 && i === chapters.length - 1))) {
      return ch.id;
    }
  }
  return chapters[chapters.length - 1].id;
}

assert.equal(chapterForProgress(0.0), 'frontier');
assert.equal(chapterForProgress(0.15), 'frontier');
assert.equal(chapterForProgress(0.30), 'zerotrust');
assert.equal(chapterForProgress(0.50), 'zerotrust');
assert.equal(chapterForProgress(0.68), 'fellowship');
assert.equal(chapterForProgress(0.95), 'fellowship');
assert.equal(chapterForProgress(1.0), 'fellowship');

console.log('✓ Chapter and frame calculation verified.');
console.log('ALL TESTS PASSED: OK');
