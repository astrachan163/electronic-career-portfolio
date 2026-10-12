/**
 * Gear-title playback.
 * prefers-reduced-motion does not still the intro (D11). Save-Data skips the download.
 */
export function motionPlan(input) {
  if (input.saveData) {
    return "still";
  }
  return "video";
}

/** Reduced motion softens parallax. The intro and chapter timelines still run. */
export function softenMotion(reduce) {
  return Boolean(reduce);
}

/**
 * A 44px pause is required for a motion cycle longer than 5 seconds.
 * The shipped gear title is 12 seconds, so it qualifies.
 */
export function needsLoopPause(durationSeconds) {
  return typeof durationSeconds === "number" && Number.isFinite(durationSeconds) && durationSeconds > 5;
}
