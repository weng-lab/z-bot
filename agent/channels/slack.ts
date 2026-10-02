import { connectSlackCredentials } from "@vercel/connect/eve";
import { slackChannel } from "eve/channels/slack";

export default slackChannel({
  credentials: connectSlackCredentials("slack/z-bot"),
  async onMessage(ctx, message) {
    if (message.author?.isBot) return null;

    const isDirectMessage = message.raw.channel_type === "im";
    const shouldReply =
      isDirectMessage || ctx.isBotMentioned() || (await ctx.isSubscribed());

    return shouldReply ? { auth: null } : null;
  },
  threadContext: { since: "last-agent-reply" },
});
