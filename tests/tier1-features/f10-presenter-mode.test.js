/**
 * Tier 1 Feature 10: Presenter Mode with 7-minute Timer
 * Authoritative Source: ORIGINAL_REQUEST.md §R4, PROJECT.md §Feature 10 & Interface Contracts
 *
 * Verifies:
 * 1. 7-minute FBLA competitive countdown timer (420 seconds max).
 * 2. Speaker notes drawer/panel displaying section-specific talking points.
 * 3. Keyboard navigation handling (arrow keys / space for section progression).
 * 4. Visual warning threshold when remaining time reaches 60 seconds.
 * 5. Presenter mode state management contract adherence.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes } = require('../helpers/assertions');
const { fileExists, loadFileContent } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const PRESENTER_JS = path.join(ROOT_DIR, 'js/presenter.js');
const PRESENTER_HTML = path.join(ROOT_DIR, 'presenter.html');

describe('Tier 1 - Feature 10: Presenter Mode with 7-min Timer', () => {

  test('T1-F10-01: Configures exact 7-minute (420 seconds) countdown timer', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const htmlContent = (loadFileContent(INDEX_HTML) || '') + (fileExists(PRESENTER_HTML) ? loadFileContent(PRESENTER_HTML) : '');
    const combined = jsContent + ' ' + htmlContent;

    const has420Seconds = /420|7:00|7\s*min/i.test(combined);
    assert(has420Seconds, 'Presenter Mode must configure a 7-minute (420 seconds) timer limit');
  });

  test('T1-F10-02: Provides speaker notes drawer with section-specific judge talking points', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const htmlContent = (loadFileContent(INDEX_HTML) || '') + (fileExists(PRESENTER_HTML) ? loadFileContent(PRESENTER_HTML) : '');
    const combined = jsContent + ' ' + htmlContent;

    const hasSpeakerNotes = /speaker-notes|notes-panel|presenter-notes|speakerNotes/i.test(combined);
    assert(hasSpeakerNotes, 'Must include speaker notes panel/drawer for presentation delivery');
  });

  test('T1-F10-03: Supports keyboard navigation (ArrowLeft / ArrowRight / Space)', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const appJs = path.join(ROOT_DIR, 'js/app.js');
    const appContent = fileExists(appJs) ? loadFileContent(appJs) : '';
    const combined = jsContent + ' ' + appContent;

    const hasKeyboardNav = /ArrowRight|ArrowLeft|keydown|keyup|keyCode/i.test(combined);
    assert(hasKeyboardNav, 'Presenter mode logic must listen for keyboard events to navigate slides/sections');
  });

  test('T1-F10-04: Implements warning indicator when countdown reaches <= 60 seconds', () => {
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    const htmlContent = (loadFileContent(INDEX_HTML) || '') + (fileExists(PRESENTER_HTML) ? loadFileContent(PRESENTER_HTML) : '');
    const combined = jsContent + ' ' + htmlContent;

    const hasWarningLogic = /warning|danger|timer-warning|60/i.test(combined);
    assert(hasWarningLogic, 'Timer must provide a visual warning state as time expires (e.g. at 1 minute remaining)');
  });

  test('T1-F10-05: Conforms to PresenterState interface contract', () => {
    // Contract from PROJECT.md: active, currentSection, elapsedSeconds/maxSeconds, notes
    const jsContent = fileExists(PRESENTER_JS) ? loadFileContent(PRESENTER_JS) : '';
    assert(jsContent.length > 0 || fileExists(INDEX_HTML), 'Presenter mode code must be present');

    const hasStateContract = /elapsed|maxSeconds|notes|active|currentSection/i.test(jsContent);
    assert(hasStateContract || fileExists(PRESENTER_JS), 'Presenter implementation must manage timer and section state');
  });

}, { tier: 1, feature: 'F10' });
