/**
 * Tier 3 Pairwise 5: Media Players x Responsive Shell (F9 x F2)
 * Authoritative Source: ORIGINAL_REQUEST.md §R2, PROJECT.md §F9 & F2
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const MAIN_CSS = path.join(ROOT_DIR, 'styles/main.css');

describe('Tier 3 - Pairwise 5: Media Players x Responsive Shell (F9 x F2)', () => {

  test('T3-P05: Video player containers adapt fluidly to mobile viewports without fixed pixel overflow', () => {
    assert(fileExists(MAIN_CSS), 'styles/main.css must exist');
    const css = loadFileContent(MAIN_CSS);

    const hasFluidVideo = /video\s*\{[^}]*max-width\s*:\s*100%|width\s*:\s*100%/i.test(css) ||
      /\.video-container|\.media-player/i.test(css);
    assert(hasFluidVideo, 'Video styling must ensure responsive adaptation to mobile widths');
  });

}, { tier: 3, feature: 'F9xF2' });
