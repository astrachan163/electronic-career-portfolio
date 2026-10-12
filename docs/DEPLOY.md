# Deploy runbook (do not run from an agent)

Project: `maqkrs-command-center-i`. Hosting site: `maqkrs-career`. There is no Firestore database and no Cloud Functions codebase in this repo (Part C). Never run a bare `firebase deploy`.

Run these commands from the repository root after `npm ci`.

## 1. Select the project and the hosting site

```sh
firebase use maqkrs-command-center-i
firebase hosting:sites:create maqkrs-career
firebase target:apply hosting maqkrs-career maqkrs-career
```

Create the site only if `firebase hosting:sites:list` does not already show `maqkrs-career`. `.firebaserc` already records the target.

## 2. Firestore

Skip. This site does not use Firestore. Do not create a database and do not deploy rules to `(default)`.

## 3. Tests

```sh
npm test
```

Do not wrap that command in `firebase emulators:exec`. There is no Auth, Functions, or Firestore code to emulate.

## 4. Preview channel

```sh
npm run build:preview
firebase hosting:channel:deploy pr-<n> --only maqkrs-career --expires 7d --config firebase.preview.json
```

`npm run build:preview` writes `dist/` with a noindex robots meta tag and `Disallow: /` in `robots.txt`, and writes `firebase.preview.json` with `X-Robots-Tag: noindex, nofollow`. The `--config` flag is what sends that header. Production `firebase.json` does not send it.

Replace `<n>` with the pull request number.

## 5. Production, after a Cody pass

```sh
npm run build
firebase deploy --only hosting:maqkrs-career
```

There is no `firestore:` deploy, no `functions:` deploy, and no `scripts/seed.mjs`. Do not deploy Storage rules.

## 6. Custom domain

Domain: `career.nonartificialsi.com`.

Grok Bot adds the `_acme-challenge.career` TXT record first. Add the CNAME `career` to `maqkrs-career.web.app` only after the certificate is active.

## 7. Hub registry and version

`npm run build` writes `dist/version.json`:

```json
{ "sha": "<git sha>", "builtAt": "<ISO time>", "app": "maqkrs-career" }
```

Hosting allows `GET` from `https://command.nonartificialsi.com` on that file only.

Add this row to `maqkrs-dashboard/registry/apps.json` (do that in the hub repo, not here):

```json
{
  "id": "maqkrs-career",
  "name": "Electronic Career Portfolio",
  "brand": "MaQkrs",
  "publicUrl": "https://career.nonartificialsi.com",
  "webAppUrl": "https://career.nonartificialsi.com",
  "project": "maqkrs-command-center-i",
  "site": "maqkrs-career",
  "repo": "https://github.com/astrachan163/electronic-career-portfolio",
  "healthUrl": "https://career.nonartificialsi.com/version.json",
  "demo": false
}
```

`demo` is false because this portfolio has no sign-in and no sandbox session.
