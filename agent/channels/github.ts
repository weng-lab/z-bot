import { connectGitHubCredentials } from "@vercel/connect/eve";
import { defaultGitHubAuth, githubChannel } from "eve/channels/github";

const REVIEWED_PR_ACTIONS = new Set(["opened", "reopened", "ready_for_review"]);
const REVIEWED_ISSUE_ACTIONS = new Set(["opened", "reopened"]);

export default githubChannel({
  botName: "z-bot-assistant",
  credentials: connectGitHubCredentials("github/z-bot"),

  onPullRequest(ctx, pr) {
    if (!REVIEWED_PR_ACTIONS.has(pr.action)) return null;
    if (ctx.sender.type === "Bot" || pr.raw.draft === true) return null;

    return {
      auth: defaultGitHubAuth(ctx),
      context: ["Review this pull request with the review-pr skill."],
    };
  },

  onIssue(ctx, issue) {
    if (!REVIEWED_ISSUE_ACTIONS.has(issue.action)) return null;
    if (ctx.sender.type === "Bot") return null;

    // Unlike PRs, eve only puts the issue title in the turn message.
    const body = typeof issue.raw.body === "string" ? issue.raw.body.trim() : "";
    return {
      auth: defaultGitHubAuth(ctx),
      context: [
        [
          "Review this issue with the review-issue skill.",
          "",
          "<github_issue>",
          `author: ${ctx.sender.login}`,
          "body:",
          body || "(empty)",
          "</github_issue>",
        ].join("\n"),
      ],
    };
  },
});
