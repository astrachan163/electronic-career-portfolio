# History rewrite candidates (Andrew)

This pull request removes internal files from HEAD only. It does not rewrite history.

Candidates still present in older commits:

- `.agents/teamwork/**` on `main`. Internal agent notes, dispatch files, and handoffs.
- `dist/private/**` on `main`. A private build of the portfolio, including a copy of the career data and large scrub media.
- `data/config.js` and `js/config.js`. A private build variant that contained a test login, plus retired headline wording.
- `atlas_hero_update/**` and `atlas_live_backup/**`. Copies of other sites, including retired claims.
- `prompt_draft.md`, `ORIGINAL_REQUEST.md`, `VIDEO_SHOT_LIST.md`, and `tools/build.js`. Internal instructions and the same test login string.
- `assets/docs/**` and `assets/images/**`. Previous portfolio PDFs and photographs. Removed from HEAD so they are not in the Firebase publish set.

Do not copy `.bolt/prompt`, `.env*`, or chat logs out of history. A history rewrite, if Andrew wants one, is a separate operation.

`gitleaks dir . --redact` and `gitleaks git --log-opts=--all --redact` report no leaks. `.gitleaks.toml` allowlists one false positive: the Wi-Fi protocol name WPA3-Enterprise in `data/resume.json`.
