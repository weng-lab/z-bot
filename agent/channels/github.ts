import { connectGitHubCredentials } from "@vercel/connect/eve";
import { githubChannel } from "eve/channels/github";

export default githubChannel({
  botName: "z-bot-assistant",
  credentials: connectGitHubCredentials("github/z-bot"),
});
