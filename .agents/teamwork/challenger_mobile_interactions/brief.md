# Challenger 1 Brief: Mobile Interactions & Stress Testing

## Mission
Empirically stress-test the mobile interactive features of Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`):
1. Polymorphic media modal player:
   - Test image vs video triggering.
   - Test close button response, backdrop click and touchend handlers.
   - Verify that closing a playing video completely pauses audio/video and cleans up src to prevent background leaks.
   - Test modal header truncation on narrow screens with long titles.
2. 4-tier educational accordion:
   - Test keyboard interaction (Enter and Space keys) and touch toggling.
   - Test aria-expanded state synchronization.
3. Salary Explorer:
   - Test toggle between BLS Industry and Federal GS pay bands.
   - Verify correct visibility switching and aria-selected state.
4. Touch cues vs keyboard navigation:
   - Verify keyboard cues are hidden on touchscreens and swipe cues are shown.

Write test harnesses or run verification scripts to prove correctness.
Report verdict (APPROVE or REQUEST_CHANGES) in `handoff.md`.
