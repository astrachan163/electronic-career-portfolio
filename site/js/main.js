import { motionPlan } from "./motion-policy.js";

const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const saveData = Boolean(navigator.connection && navigator.connection.saveData);
const poster = document.querySelector("[data-intro-poster]");
const stage = document.querySelector("[data-intro-stage]");
const skip = document.querySelector("[data-skip-intro]");

const STILL_SRC = "/brand/motion/maqkrs-title-intro-still-reduced-motion-960.webp";
const STILL_SET = "/brand/motion/maqkrs-title-intro-still-reduced-motion-960.webp 960w, /brand/motion/maqkrs-title-intro-still-reduced-motion-1920.webp 1920w";

function showStill() {
  document.documentElement.setAttribute("data-motion", "still");
  if (!poster) {
    return;
  }
  poster.src = STILL_SRC;
  poster.srcset = STILL_SET;
  poster.alt = "MaQkrs gear title, reduced-motion still";
}

function skipIntro() {
  const video = document.querySelector(".intro-video");
  if (video) {
    video.pause();
    video.remove();
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

function probeFps(samples) {
  return new Promise((resolve) => {
    const deltas = [];
    let last = 0;
    function tick(now) {
      if (last !== 0) {
        deltas.push(now - last);
      }
      last = now;
      if (deltas.length >= samples) {
        const usable = deltas.slice(2);
        const average = usable.reduce((sum, value) => sum + value, 0) / usable.length;
        resolve(1000 / average);
        return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("script failed"));
    document.body.appendChild(script);
  });
}

function findRule(selector) {
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of rules) {
      if (rule.selectorText === selector) {
        return rule;
      }
    }
  }
  return null;
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
    source.src = "/brand/motion/maqkrs-title-intro-720p.mp4";
    source.type = "video/mp4";
    video.append(source);
  } else {
    const mp4 = document.createElement("source");
    mp4.src = "/brand/motion/maqkrs-title-intro-1080p.mp4";
    mp4.type = "video/mp4";
    const webm = document.createElement("source");
    webm.src = "/brand/motion/maqkrs-title-intro-1080p.webm";
    webm.type = "video/webm";
    video.append(mp4, webm);
  }
  video.addEventListener("playing", () => {
    video.classList.add("is-playing");
  });
  video.addEventListener("error", () => {
    video.remove();
    showStill();
  });
  stage.append(video);
  const played = video.play();
  if (played && typeof played.catch === "function") {
    played.catch(() => {
      video.remove();
      showStill();
    });
  }
}

function initChapters() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    return;
  }
  const chapters = [
    { id: "about", clip: false },
    { id: "experience", clip: false },
    { id: "projects", clip: true },
    { id: "contact", clip: false },
  ];
  const rules = [];
  for (const chapter of chapters) {
    const rule = findRule(`#${chapter.id} .reveal`);
    if (!rule) {
      return;
    }
    rules.push({ chapter, rule });
  }
  const probe = document.querySelector("#about .reveal");
  rules[0].rule.style.opacity = "0.42";
  if (!probe || getComputedStyle(probe).opacity !== "0.42") {
    for (const item of rules) {
      item.rule.style.opacity = "1";
      item.rule.style.transform = "none";
      item.rule.style.clipPath = "inset(0)";
    }
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  for (const item of rules) {
    const proxy = { p: 0 };
    gsap.fromTo(proxy, { p: 0 }, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: `#${item.chapter.id}`,
        start: "top 85%",
        end: "top 45%",
        scrub: true,
      },
      onUpdate: () => {
        const progress = proxy.p;
        item.rule.style.opacity = String(progress);
        item.rule.style.transform = `translate3d(0, ${(1 - progress) * 28}px, 0)`;
        if (item.chapter.clip) {
          item.rule.style.clipPath = `inset(${(1 - progress) * 8}% 0 0 0)`;
        }
      },
    });
  }
  ScrollTrigger.refresh();
}

async function startMotion() {
  const fps = await probeFps(12);
  const plan = motionPlan({
    reduce: reduceQuery.matches,
    saveData,
    fps,
  });
  if (plan === "still") {
    showStill();
    return;
  }
  document.documentElement.setAttribute("data-motion", "video");
  const begin = () => {
    mountVideo();
    loadScript("/vendor/gsap/gsap.min.js")
      .then(() => loadScript("/vendor/gsap/ScrollTrigger.min.js"))
      .then(() => initChapters())
      .catch(() => {
        document.documentElement.setAttribute("data-motion", "still");
      });
  };
  if (document.readyState === "complete") {
    begin();
  } else {
    window.addEventListener("load", begin, { once: true });
  }
}

if (motionPlan({ reduce: reduceQuery.matches, saveData, fps: 60 }) === "still") {
  showStill();
} else {
  startMotion();
}
