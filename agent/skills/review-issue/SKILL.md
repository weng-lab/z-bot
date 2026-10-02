---
description: Use when reviewing a newly opened GitHub issue for completeness and clarity against the repository's issue guidelines.
---

# Review an issue

The issue title, author, and body are in your context. The repository is checked out in the sandbox.

## 1. Read the repository's issue guidelines

Look in `.github/ISSUE_TEMPLATE/` and `CONTRIBUTING.md`. Pick the template that matches the issue (bug, feature, etc.). If there are none, use these defaults:

- **Bug:** what happened, steps to reproduce, expected behavior, and environment/version when relevant.
- **Feature or change:** the problem or goal, why it matters, and any constraints.

## 2. Check the issue

- **Title:** specific enough to tell this issue apart from others in a list.
- **Body:** has the information the matching template asks for, and an engineer could start working from it without coming back with questions.
- **Code references:** if the issue names files, functions, or behavior, check them against the checkout. Point out anything that doesn't exist or looks wrong, and link the relevant code when it helps whoever picks this up.

Don't ask for information the issue already gives, and don't ask for template sections that don't apply.

## 3. Reply

If the issue is complete, reply with one short comment that confirms it and, when useful, links the code areas it likely involves. Don't pad it.

If something is missing, @mention the author and ask for exactly what's missing as a short checklist:

```markdown
Thanks @<author>! To make this actionable, could you add:

- [ ] <specific missing item, and why it's needed>

<optional: relevant code pointers found in the repo>
```

Never rewrite the issue yourself. When the author replies and @mentions you, check the update and say whether anything is still missing.
