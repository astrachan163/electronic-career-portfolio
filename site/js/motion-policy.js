/**
 * Decides whether the gear-title intro plays video.
 * A still is required for reduced motion, Save-Data, or a frame probe under 50 fps.
 */
export function motionPlan(input) {
  if (input.reduce || input.saveData) {
    return "still";
  }
  if (typeof input.fps === "number" && input.fps < 50) {
    return "still";
  }
  return "video";
}
