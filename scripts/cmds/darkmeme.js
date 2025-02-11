const axios = require("axios");

module.exports = {
  config: {
    name: "darkmeme",
    aliases: ["dmeme"],
    author: "Kshitiz & Rickciel",
    version: "2.1",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: "Get a dark meme!",
    },
    longDescription: {
      en: "Grab a flashlight and brace yourself for a dark meme!",
    },
    category: "fun",
    guide: {
      en: "{p}{n}dmeme",
    },
  },
  onStart: async function ({ api, event, args }) {
    try {
      // Notify the user the meme is loading
      api.sendMessage("💀 Fetching a dark meme for you... hang tight!", event.threadID);

      // Fetch the dark meme
      const response = await axios.get("https://api31.chatbotmesss.repl.co/api/meme", {
        responseType: "stream",
      });

      // Send the meme to the chat
      api.sendMessage(
        {
          body: "💀 Here's a dark meme for you!\n😂 Let the darkness amuse you.",
          attachment: response.data,
        },
        event.threadID
      );
    } catch (error) {
      // Error handling with a humorous touch
      console.error(error);
      api.sendMessage(
        "⚠️ Uh-oh, looks like the darkness consumed the meme server.\nPlease try again later!",
        event.threadID,
        event.messageID
      );
    }
  },
};
