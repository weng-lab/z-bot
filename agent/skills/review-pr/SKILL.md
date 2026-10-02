---
description: Use when reviewing a pull request, either because it was just opened or because someone asked for a re-review.
---

# Review a pull request

The PR title, body, metadata, and diff are in your context. The repository is checked out in the sandbox at the PR head, with the base branch available, so you can read whole files, grep for callers, and run `git diff`/`git log` against the base.

## 1. Read the repository's guides

Find the guides listed in your instructions. Note what they require for PR titles, PR bodies, commit scope, tests, and code style. If there is a PR template, the body should follow it.

## 2. Hygiene review

Check the PR as a unit of work:

- **Title.** Does it follow the repository's convention (e.g. Conventional Commits, ticket prefix)? Without one, it should say what changes in plain words, in imperative mood, and not be vague ("fix stuff", "updates").
- **Body.** Does it explain what changed and why, follow the template, and link the issue it resolves? A reviewer should be able to understand the intent without reading the diff.
- **Scope.** Go through every changed file and decide whether it serves the goal the title and body describe. List each file or hunk that doesn't, with a one-line reason, e.g. "`src/utils/date.ts`: reformatting unrelated to the auth fix". Incidental changes the change actually needs (tests, types, call sites, lockfile updates from a declared dependency change) are in scope. Unrelated refactors, drive-by formatting, debug leftovers, and unexplained config changes are not.
- **Size.** If the PR does several separable things, suggest how to split it.

## 3. Code review

Review the diff the way a careful senior teammate would. Read surrounding code when the diff alone isn't enough.

- Correctness: logic errors, unhandled edge cases, broken error handling, race conditions, wrong assumptions about callers.
- Security: injection, leaked secrets, missing authorization, unsafe input handling.
- Tests: is the new behavior covered, and do changed tests still test something meaningful?
- Consistency: does the code follow the patterns, naming, and idioms of the code around it and the repository's guides?
- Maintainability: needless complexity, duplication of existing helpers, dead code.

Skip anything a formatter or linter would catch, and don't restate what the code does.

## 4. Post the review

Reply with one comment in this shape. Omit any section that has nothing in it.

```markdown
## z-bot review

**Summary:** <one or two sentences on what the PR does and your overall take>

### Title and description
- <finding, citing the guide when one applies>

### Scope
- `<path>`: <why it looks unrelated to the stated goal>

### Code
**Must fix**
- `<path>:<line>`: <problem and suggested fix>

**Should fix**
- ...

**Nits**
- ...

---
<sub>Reply with `@z-bot-assistant` to ask questions or request a re-review.</sub>
```

"Must fix" is for bugs, security problems, and guide violations. If everything looks good, say so in the summary and post just that.

## Re-reviews

When asked to re-review, focus on what changed since your last review (`git log` and `git diff` against the commit you last reviewed), say which earlier findings are resolved, and only raise new findings from the new changes.
