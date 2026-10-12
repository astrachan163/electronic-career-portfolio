import assert from "node:assert/strict";
import test from "node:test";
import { motionPlan } from "../site/js/motion-policy.js";

test("video plays only when motion is allowed and the probe holds 50 fps", () => {
  assert.equal(motionPlan({ reduce: false, saveData: false, fps: 50 }), "video");
  assert.equal(motionPlan({ reduce: false, saveData: false, fps: 60 }), "video");
  assert.equal(motionPlan({ reduce: true, saveData: false, fps: 60 }), "still");
  assert.equal(motionPlan({ reduce: false, saveData: true, fps: 60 }), "still");
  assert.equal(motionPlan({ reduce: false, saveData: false, fps: 49.9 }), "still");
});
