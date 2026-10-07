# Challenger 2 Brief: Responsive Viewports & Stress Testing

## Mission
Empirically stress-test the responsive layout and build artifacts of Andrew Strachan's Career Portfolio (`/Users/andrewstrachan/career_portfolio`) across multiple screen sizes:
1. Mobile Viewport (375px):
   - Sticky canvas 400dvh pipeline and 100dvh inner container.
   - Filter chips horizontal scrolling (`scroll-snap-type: x mandatory`).
   - Skills grid 2-column layout.
   - Salary table conversion to vertical flex cards (`data-label`).
   - Timeline padding and left clipping checks.
2. Tablet Viewport (768px):
   - Grid layouts, navigation drawer, card proportions.
3. Desktop Viewport (1440px):
   - Full layout flow, hover states, presenter shortcuts.
4. Console Errors & Build Validation:
   - Check for any runtime JavaScript or CSS parsing errors.
   - Verify `node tools/build.js` matches `dist/` with source.

Report verdict (APPROVE or REQUEST_CHANGES) in `handoff.md`.
