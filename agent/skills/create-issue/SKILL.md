---
name: create-issue
description: Use when the user explicitly asks to create, file, or open a GitHub issue. Do not use for general issue discussion or when the user only wants a draft.
---

## Workflow

1. Gather surrounding conversation context related to the issue creation request.
2. Resolve the repository before drafting:
   - If the request contains an exact repository name, use it.
   - If the repository is missing, partial, or colloquial, call `github__apps_list-repos-accessible-to-installation` and compare the accessible repository names case-insensitively, accounting for punctuation and version suffixes.
   - Use a repository without asking only when there is one clear match. If there are multiple plausible matches, present the candidates and ask the user to choose. For example, `screen` is ambiguous when both `screen2.0` and `screen3.0` exist.
   - If no repository hint was provided, ask which accessible repository to use.
3. Select and read the template that matches the request:
   - Use `templates/bug.md` when existing behavior is incorrect, broken, or unexpectedly failing.
   - Use `templates/change.md` for features, improvements, refactors, chores, or other requested changes.
   - Infer the closest type from context without asking unless the distinction materially changes the request.
4. Infer the title and fill the selected template from context. Preserve its body heading order, but do not include the template's YAML frontmatter, HTML comments, or empty placeholder text in the issue body. Ask only for essential missing information; do not present a separate draft unless the user asks for one.
5. Create the issue. Apply relevant labels only when justified by the request or repository context. Assign someone only when their GitHub username is explicitly known. Leave uncertain metadata unset rather than guessing.
6. On success, respond with a simple confirmation and the issue URL. On failure, state the failure and why.

## Resources

- `templates/bug.md`: Body structure for incorrect or failing existing behavior. Read when creating a bug report.
- `templates/change.md`: Body structure for features, improvements, refactors, chores, and other changes. Read when creating a change request.
