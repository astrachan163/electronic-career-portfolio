/**
 * Tier 1 Feature 3: Interactive Resume Component
 * Authoritative Source: ORIGINAL_REQUEST.md §FBLA Guidelines, PROJECT.md §Feature 3
 *
 * Verifies:
 * 1. Candidate profile header (Andrew Strachan, CyberCorps SFS Fellow).
 * 2. Academic degrees & GPA verification (UAB 3.75, Montevallo 3.75, MC 3.5).
 * 3. Categorized skills matrix (Cybersecurity, AI/ML, Cloud/DevSecOps, Systems, Leadership).
 * 4. Interactive technology filter features in resume component.
 * 5. STAR methodology accomplishment items with tangible results.
 */

const path = require('path');
const { describe, test } = require('../helpers/test-harness');
const { assert, assertEqual, assertIncludes, assertGreaterThanOrEqual } = require('../helpers/assertions');
const { fileExists, loadFileContent, loadJsonSafely } = require('../helpers/static-checks');

const ROOT_DIR = path.resolve(__dirname, '../../');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const RESUME_JSON = path.join(ROOT_DIR, 'data/resume.json');

describe('Tier 1 - Feature 3: Interactive Resume Component', () => {

  test('T1-F3-01: Candidate identity matches Andrew Strachan CyberCorps SFS profile', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    assertIncludes(html, 'Andrew Strachan', 'HTML must prominently display Andrew Strachan');

    const hasSfsReference = /CyberCorps|Scholarship for Service|SFS Fellow/i.test(html);
    assert(hasSfsReference, 'Resume must highlight CyberCorps Scholarship for Service (SFS) distinction');
  });

  test('T1-F3-02: Academic record documents UAB (3.75), Montevallo (3.75), and Mississippi College (3.5)', () => {
    // Check either data/resume.json or index.html
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (resumeData ? JSON.stringify(resumeData) : '') + ' ' + html;

    assertIncludes(content, 'University of Alabama at Birmingham', 'Academic record must include UAB');
    assertIncludes(content, 'Montevallo', 'Academic record must include University of Montevallo');
    assertIncludes(content, 'Mississippi College', 'Academic record must include Mississippi College');

    assert(/3\.75/.test(content), 'GPA record must document 3.75 GPA');
    assert(/3\.5/.test(content), 'GPA record must document 3.5 GPA');
  });

  test('T1-F3-03: Skills matrix organizes capabilities across at least 4 distinct domains', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (resumeData ? JSON.stringify(resumeData) : '') + ' ' + html;

    const domains = [
      /Cybersecurity|Zero-Trust|Security Architecture/i,
      /Artificial Intelligence|AI|Machine Learning|LLM|RAG/i,
      /Cloud|DevSecOps|AWS|Firebase/i,
      /Systems|Languages|Swift|Python|Java/i,
      /Leadership|Teaching|Education|Curriculum/i,
    ];

    const matchedDomains = domains.filter(d => d.test(content));
    assertGreaterThanOrEqual(matchedDomains.length, 4,
      `Skills matrix must cover key technical domains. Matched: ${matchedDomains.length}`);
  });

  test('T1-F3-04: Resume component integrates interactive technology filtering features', () => {
    const html = loadFileContent(INDEX_HTML) || '';
    const jsFiles = [
      path.join(ROOT_DIR, 'js/resume.js'),
      path.join(ROOT_DIR, 'js/app.js'),
    ];
    const jsContent = jsFiles.filter(f => fileExists(f)).map(f => loadFileContent(f)).join('\n');
    const combined = html + '\n' + jsContent;

    const hasFilterButtons = /data-filter|filter-btn|skill-tab|category-filter|filterSkills/i.test(combined);
    assert(hasFilterButtons, 'Resume must provide interactive filter tabs/controls to review skills');
  });

  test('T1-F3-05: Experience items demonstrate STAR methodology with measurable metrics', () => {
    const { data: resumeData } = loadJsonSafely(RESUME_JSON);
    const html = loadFileContent(INDEX_HTML) || '';
    const content = (resumeData ? JSON.stringify(resumeData) : '') + ' ' + html;

    // Checks for STAR structure or key accomplishment milestones (Shades Valley FBLA, Corner High DECA, MidSouth cGMP)
    const hasShadesValley = /Shades Valley/i.test(content);
    const hasDecaOrFbla = /FBLA|DECA/i.test(content);
    const hasMeasurableOutcome = /state|1st|2nd|Torchbearer|SOP|cGMP|4\.0|3\.75/i.test(content);

    assert(hasShadesValley, 'Experience must detail teaching and leadership at Shades Valley High School');
    assert(hasDecaOrFbla, 'Experience must document student organization coaching (FBLA or DECA)');
    assert(hasMeasurableOutcome, 'Accomplishments must report measurable outcomes and leadership results');
  });

}, { tier: 1, feature: 'F3' });
