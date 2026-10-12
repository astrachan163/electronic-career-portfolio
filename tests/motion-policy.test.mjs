import assert from "node:assert/strict";
import test from "node:test";
import { motionPlan, needsLoopPause, softenMotion } from "../site/js/motion-policy.js";

test("the gear title stays on under reduced motion and pauses after 5 seconds", () => {
  assert.equal(motionPlan({ saveData: false }), "video");
  assert.equal(motionPlan({ saveData: true }), "still");
  assert.equal(softenMotion(true), true);
  assert.equal(softenMotion(false), false);
  assert.equal(needsLoopPause(12), true);
  assert.equal(needsLoopPause(5), false);
  assert.equal(needsLoopPause(4.9), false);
});
