import { introSlot } from "./intro-slot.js";
import { motionPlan, needsLoopPause, softenMotion } from "./motion-policy.js";

const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const saveData = Boolean(navigator.connection && navigator.connection.saveData);
const poster = document.querySelector("[data-intro-poster]");
const stage = document.querySelector("[data-intro-stage]");
const skip = document.querySelector("[data-skip-intro]");
const pauseButton = document.querySelector("[data-motion-pause]");

const STILL_SRC = introSlot.poster;
const STILL_SET = introSlot.posterSrcSet;

if (softenMotion(reduceQuery.matches)) {
  document.documentElement.setAttribute("data-soften", "true");
}

function showStill() {
  document.documentElement.setAttribute("data-motion", "still");
  if (!poster) {
    return;
  }
  poster.src = STILL_SRC;
  poster.srcset = STILL_SET;
}

function skipIntro() {
  const video = document.querySelector(".intro-video");
  if (video) {
    video.pause();
    video.remove();
  }
  if (pauseButton) {
    pauseButton.hidden = true;
  }
  const heading = document.getElementById("about-title");
  const about = document.getElementById("about");
  if (about) {
    about.scrollIntoView();
  }
  if (heading) {
    heading.focus();
  }
}

if (skip) {
  skip.addEventListener("click", skipIntro);
}

function bindPause(video) {
  if (!pauseButton) {
    return;
  }
  const arm = () => {
    if (!needsLoopPause(video.duration) || pauseButton.dataset.armed === "true") {
      return;
    }
    pauseButton.dataset.armed = "true";
    pauseButton.hidden = false;
    pauseButton.setAttribute("aria-pressed", "false");
    pauseButton.addEventListener("click", () => {
      if (video.paused) {
        const played = video.play();
        if (played && typeof played.catch === "function") {
          played.catch(() => {});
        }
        pauseButton.textContent = "Pause";
        pauseButton.setAttribute("aria-pressed", "false");
        return;
      }
      video.pause();
      pauseButton.textContent = "Play";
      pauseButton.setAttribute("aria-pressed", "true");
    });
    video.addEventListener("ended", () => {
      pauseButton.textContent = "Play";
      pauseButton.setAttribute("aria-pressed", "true");
    });
  };
  if (video.readyState >= 1) {
    arm();
    return;
  }
  video.addEventListener("loadedmetadata", arm, { once: true });
}

function mountVideo() {
  if (!stage || document.querySelector(".intro-video")) {
    return;
  }
  const video = document.createElement("video");
  video.className = "intro-video";
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.preload = "metadata";
  video.setAttribute("playsinline", "");
  video.setAttribute("aria-label", "MaQkrs title animation");
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  if (mobile) {
    const source = document.createElement("source");
    source.src = introSlot.mobileMp4;
    source.type = "video/mp4";
    video.append(source);
  } else {
    const mp4 = document.createElement("source");
    mp4.src = introSlot.desktopMp4;
    mp4.type = "video/mp4";
    const webm = document.createElement("source");
    webm.src = introSlot.desktopWebm;
    webm.type = "video/webm";
    video.append(mp4, webm);
  }
  video.addEventListener("playing", () => {
    video.classList.add("is-playing");
  });
  video.addEventListener("error", () => {
    video.remove();
    if (pauseButton) {
      pauseButton.hidden = true;
    }
    showStill();
  });
  stage.append(video);
  bindPause(video);
  const played = video.play();
  if (played && typeof played.catch === "function") {
    played.catch(() => {
      video.remove();
      if (pauseButton) {
        pauseButton.hidden = true;
      }
      showStill();
    });
  }
}

function startMotion() {
  document.documentElement.setAttribute("data-motion", "video");
  const begin = () => {
    mountVideo();
  };
  if (document.readyState === "complete") {
    begin();
  } else {
    window.addEventListener("load", begin, { once: true });
  }
}

if (motionPlan({ saveData }) === "still") {
  showStill();
} else {
  startMotion();
}
