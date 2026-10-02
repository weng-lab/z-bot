import { connect } from "@vercel/connect/eve";
import { defineOpenAPIConnection } from "eve/connections";

export default defineOpenAPIConnection({
  spec: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json",
  baseUrl: "https://api.github.com",
  description:
    "GitHub issues, pull requests, comments, labels, and workflow runs for repositories available to Z-bot's GitHub App installation.",
  auth: connect({
    connector: "github/z-bot",
    principalType: "app",
  }),
  operations: {
    allow: [
      "apps_list-repos-accessible-to-installation",
      "issues_create",
      "issues_get",
      "issues_list-for-repo",
      "issues_create-comment",
      "issues_add-labels",
      "pulls_get",
      "pulls_list",
      "actions_list-workflow-runs-for-repo",
    ],
  },
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
