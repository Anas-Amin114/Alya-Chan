module.exports = {
  config: {
    name: "ping",
    aliases: ["ms", "latency"],
    version: "1.1",
    author: "Sandu",
    role: 0,
    shortDescription: {
      en: "Displays the current ping of the bot's system with a stylish touch!"
    },
    longDescription: {
      en: "Displays the current ping (latency) of the bot's system with emojis for a more beautiful response."
    },
    category: "System",
    guide: {
      en: "Use {p}ping to check the current ping (latency) of the bot's system."
    }
  },

  onStart: async function ({ api, event, args }) {
    const timeStart = Date.now();

    // Sending initial message with a cool emoji
    await api.sendMessage("🔍 **Checking Bot's Ping...** Please wait a moment ⏳", event.threadID);

    const ping = Date.now() - timeStart;

    // Beautiful and stylized response with emojis
    api.sendMessage(`💨 **Pong!** 🏓\nThe current **ping** is: \`${ping}ms\` 😎\n\n✨ *Bot is running smoothly!* ✨`, event.threadID);
  }
};
