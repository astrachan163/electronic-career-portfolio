import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { CANONICAL, pagesTarget } from "../pages/redirect.mjs";

const root = process.cwd();

test("old Pages hashes and deep paths land on the Firebase URL", () => {
  assert.equal(pagesTarget("/electronic-career-portfolio/", ""), CANONICAL);
  assert.equal(pagesTarget("/electronic-career-portfolio/index.html", "#hero"), `${CANONICAL}#about`);
  assert.equal(pagesTarget("/electronic-career-portfolio/", "#resume"), `${CANONICAL}#about`);
  assert.equal(pagesTarget("/", "#education"), `${CANONICAL}#about`);
  assert.equal(pagesTarget("/", "#skills"), `${CANONICAL}#experience`);
  assert.equal(pagesTarget("/", "#career"), `${CANONICAL}#experience`);
  assert.equal(pagesTarget("/", "#projects"), `${CANONICAL}#projects`);
  assert.equal(pagesTarget("/", "#sources"), `${CANONICAL}sources`);
  assert.equal(pagesTarget("/", "#game-canvas"), CANONICAL);
  assert.equal(
    pagesTarget("/electronic-career-portfolio/assets/docs/AndrewStrachanResume.pdf", ""),
    `${CANONICAL}#about`,
  );
  assert.equal(
    pagesTarget("/electronic-career-portfolio/assets/images/professional-development/IMG_1062.png", ""),
    `${CANONICAL}#experience`,
  );
  assert.equal(
    pagesTarget("/electronic-career-portfolio/assets/previews/sanctum.mp4", ""),
    `${CANONICAL}#projects`,
  );
  assert.equal(pagesTarget("/electronic-career-portfolio/data/projects.json", ""), `${CANONICAL}#projects`);
  assert.equal(pagesTarget("/electronic-career-portfolio/data/resume.json", ""), `${CANONICAL}#about`);
  assert.equal(pagesTarget("/electronic-career-portfolio/js/app.js", ""), CANONICAL);
  assert.equal(pagesTarget("/electronic-career-portfolio/styles/main.css", ""), CANONICAL);
  assert.equal(pagesTarget("/electronic-career-portfolio/README.md", ""), CANONICAL);
});

test("the Pages stub redirects with a canonical and a visible link", () => {
  for (const name of ["index.html", "404.html"]) {
    const html = readFileSync(path.join(root, "pages", name), "utf8");
    assert.match(html, /rel="canonical" href="https:\/\/career\.nonartificialsi\.com\/"/);
    assert.match(html, /http-equiv="refresh" content="2; url=https:\/\/career\.nonartificialsi\.com\/"/);
    assert.match(
      html,
      /<a data-continue href="https:\/\/career\.nonartificialsi\.com\/">Continue to the Electronic Career Portfolio<\/a>/,
    );
    assert.match(html, /src="\/electronic-career-portfolio\/redirect\.mjs"/);
  }
  const workflow = readFileSync(path.join(root, ".github", "workflows", "pages-redirect.yml"), "utf8");
  assert.equal(workflow.includes("pull_request"), false);
  assert.equal(workflow.includes("branches:"), false);
  assert.match(workflow, /workflow_dispatch/);
  assert.match(workflow, /version\.json/);
  assert.match(workflow, /maqkrs-career/);
  assert.match(workflow, /GITHUB_RUN_ID/);
  assert.match(workflow, /publish_branch: gh-pages/);
  assert.match(workflow, /ready=no/);
  const deploy = readFileSync(path.join(root, "docs", "DEPLOY.md"), "utf8");
  assert.match(deploy, /astrachan163\.github\.io\/electronic-career-portfolio/);
  assert.match(deploy, /meta refresh/);
  assert.match(deploy, /workflow_dispatch/);
  assert.match(deploy, /version\.json/);
  assert.equal(deploy.includes("returns HTTP 200"), false);
});

test("gitguardian ignores the deleted AdaptiveSchool backup tree", () => {
  const config = readFileSync(path.join(root, ".gitguardian.yaml"), "utf8");
  assert.match(config, /^version: 2$/m);
  assert.match(config, /atlas_live_backup\/\*\*\/\*/);
  assert.match(config, /minified Turbopack chunk/);
});
