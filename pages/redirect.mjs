/**
 * Maps the published GitHub Pages paths onto https://career.nonartificialsi.com/.
 * Loaded by pages/index.html and pages/404.html. Node tests import pagesTarget.
 */

export const CANONICAL = "https://career.nonartificialsi.com/";
const BASE = "/electronic-career-portfolio";

const HASH_CHAPTER = {
  hero: "about",
  resume: "about",
  "resume-heading": "about",
  education: "about",
  "education-heading": "about",
  "main-content": "about",
  "invasion-hero-section": "about",
  about: "about",
  career: "experience",
  "career-heading": "experience",
  development: "experience",
  "development-heading": "experience",
  enhancement: "experience",
  skills: "experience",
  "skills-heading": "experience",
  "salary-explorer-toggle": "experience",
  "salary-pane-bls": "experience",
  "salary-pane-gs": "experience",
  "skills-matrix-display": "experience",
  "skills-repos-drawer": "experience",
  experience: "experience",
  projects: "projects",
  "projects-heading": "projects",
  contact: "contact",
  sources: "sources",
  "sources-heading": "sources",
};

function stripBase(pathname) {
  let path = String(pathname || "/").split("?")[0].split("#")[0];
  if (path === BASE || path.startsWith(`${BASE}/`)) {
    path = path.slice(BASE.length) || "/";
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  if (path.endsWith("/index.html")) {
    path = path.slice(0, -"/index.html".length) || "/";
  }
  if (path === "") {
    return "/";
  }
  return path;
}

function chapterUrl(chapter) {
  if (chapter === "sources") {
    return `${CANONICAL}sources`;
  }
  return `${CANONICAL}#${chapter}`;
}

function pathTarget(path) {
  if (path === "/sources" || path.startsWith("/sources/")) {
    return `${CANONICAL}sources`;
  }
  if (
    path.startsWith("/assets/docs/") ||
    path.startsWith("/assets/invasion/") ||
    path.startsWith("/assets/scrub/") ||
    path === "/data/career.json" ||
    path === "/data/resume.json"
  ) {
    return chapterUrl("about");
  }
  if (
    path.startsWith("/assets/images/professional-development/") ||
    path === "/data/certifications.json"
  ) {
    return chapterUrl("experience");
  }
  if (
    path.startsWith("/assets/previews/") ||
    path.startsWith("/assets/screenshots/") ||
    path === "/data/projects.json"
  ) {
    return chapterUrl("projects");
  }
  return CANONICAL;
}

export function pagesTarget(pathname, hash) {
  const id = String(hash || "").replace(/^#/, "");
  if (id && Object.prototype.hasOwnProperty.call(HASH_CHAPTER, id)) {
    return chapterUrl(HASH_CHAPTER[id]);
  }
  return pathTarget(stripBase(pathname));
}

export function applyPagesRedirect(doc, loc) {
  const target = pagesTarget(loc.pathname, loc.hash);
  const link = doc.querySelector("a[data-continue]");
  if (link) {
    link.href = target;
  }
  const meta = doc.querySelector('meta[http-equiv="refresh"]');
  if (meta) {
    meta.setAttribute("content", `2; url=${target}`);
  }
  loc.replace(target);
}

if (typeof document !== "undefined" && document.documentElement?.dataset.pagesRedirect === "ready") {
  applyPagesRedirect(document, window.location);
}
