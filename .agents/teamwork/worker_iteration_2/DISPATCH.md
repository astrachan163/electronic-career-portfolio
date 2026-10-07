## 2026-10-07T07:16:01Z
You are Worker Iteration 2 (Remediation & Hardening Implementer).
Your working directory is: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_iteration_2/
Project root: /Users/andrewstrachan/career_portfolio

You own the following files:
- js/app.js
- index.html
- tests/tier2-boundaries/b05-provenance-boundary.test.js

Read the authoritative specifications:
1. /Users/andrewstrachan/career_portfolio/.agents/teamwork/ORIGINAL_REQUEST.md
2. /Users/andrewstrachan/career_portfolio/.agents/teamwork/orchestrator_mobile_revamp/PROJECT.md
3. Your detailed task brief: /Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_iteration_2/brief.md
4. Challenger 1 handoff: /Users/andrewstrachan/career_portfolio/.agents/teamwork/challenger_mobile_interactions/handoff.md
5. Reviewer 2 handoff: /Users/andrewstrachan/career_portfolio/.agents/teamwork/reviewer_data_credentials/handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your assignments:
1. Fix Critical Video Audio Leak on Escape Key:
   - In js/app.js (around line 572 in initImageLightbox), add a listener for the native 'close' event on modal:
     modal.addEventListener('close', () => {
       if (videoEl) {
         videoEl.pause();
         videoEl.removeAttribute('src');
         videoEl.load();
       }
     });
   - In js/app.js:323-327 (initKeyboardNavigation), ensure that pressing Escape triggers proper modal video pause and teardown.
2. Fix Redundant Accordion Tabstops:
   - In index.html (lines 152, 175, 198, 221), remove tabindex="0" from the outer <div class="accordion glass-card"> containers. Only the inner interactive <div class="accordion-header" role="button" ... tabindex="0"> should be keyboard-focusable.
3. Fallback Speaker Notes Cleanup:
   - In js/app.js:43, replace 'KY Derby, Jump$tart' with 'National Jump$tart Financial Literacy Conference (Louisville, KY)'.
4. Tier 2 Boundary Test Property Names:
   - In tests/tier2-boundaries/b05-provenance-boundary.test.js, update provData.claims to provData.provenanceEntries (line 25), and provData.scorecard to provData.rubricScorecard (line 45).
5. Build and Verify:
   - Run node tools/build.js
   - Run node tests/runner.js
   - Run node tests/verify-mobile-interactions.js (must pass 17/17 tests!)
   - Run node tools/check-links.js
   - Run node tools/check-privacy.js

Write your handoff report to:
/Users/andrewstrachan/career_portfolio/.agents/teamwork/worker_iteration_2/handoff.md
and send a completion message to your parent via send_message.
