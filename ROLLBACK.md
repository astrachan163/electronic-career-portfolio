# Pages rollback

GitHub Pages for this repository is the `gh-pages` branch, served at path `/`.

The pre-deploy Pages commit, from before `deb4e89a1f13e5a77e48e1416845908d98dd2398`, is:

`91268cc8c99f10c663e1363792c6da13cc7e23dc`

`dist/public` on the pull request branch is a gitlink to the deployed Pages commit. Restoring the live site does not happen by editing this file. These commands are recorded only. Do not run them unless the owner wants the previous Pages snapshot back.

Run the commands from a clone of `https://github.com/astrachan163/electronic-career-portfolio`.

## Non-force option

This adds a new commit on `gh-pages`. It does not rewrite history.

```bash
git fetch origin gh-pages
git switch -c restore-pages origin/gh-pages
git revert --no-edit deb4e89a1f13e5a77e48e1416845908d98dd2398
git push origin HEAD:gh-pages
```

If that revert does not apply, restore the old tree as a new commit instead:

```bash
git fetch origin gh-pages
git switch -c restore-pages origin/gh-pages
git restore --source=91268cc8c99f10c663e1363792c6da13cc7e23dc --staged --worktree :/
git commit -m "Restore Pages tree to 91268cc8c99f10c663e1363792c6da13cc7e23dc"
git push origin HEAD:gh-pages
```

After `gh-pages` is back at that tree, point the gitlink at the same commit from the portfolio branch:

```bash
git update-index --cacheinfo 160000,91268cc8c99f10c663e1363792c6da13cc7e23dc,dist/public
git commit -m "Point dist/public gitlink back at the pre-deploy Pages commit"
```

## Force-reset option

OWNER APPROVAL REQUIRED. This rewrites `gh-pages` and discards `deb4e89a1f13e5a77e48e1416845908d98dd2398`. Do not run it without that approval.

```bash
git fetch origin gh-pages
git push --force origin 91268cc8c99f10c663e1363792c6da13cc7e23dc:gh-pages
```
