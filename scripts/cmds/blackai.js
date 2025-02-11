const axios = require("axios");

module.exports = {
  config: {
    name: "blackai",
    version: "1.0",
    author: "Nihan",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "._."
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "ai"
  },

  async makeRequest(userMessage) {
    try {
      const apiUrl = 'https://blackai.nihan1.repl.co/ask';
      const response = await axios.get(apiUrl, { params: { q: userMessage } });
      return response.data;
    } catch (error) {
      console.error("Error making API request:", error.message);
      throw error;
    }
  },

  async handleApiResponse({ message, commandName, info, event, response }) {
    try {
      message.reply({ body: `${response.message}` }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error handling API response:", error.message);
    }
  },

  async onStart({ message, event, args, commandName }) {
    const userMessage = args.join(" ");

    try {
      const response = await this.makeRequest(userMessage);
      await this.handleApiResponse({ message, commandName, event, response });
    } catch (error) {
      console.error("Error in onStart:", error.message);
    }
  },

  async onReply({ message, event, Reply, args, commandName }) {
    const { author } = Reply;
    if (event.senderID !== author) return;

    const userMessage = args.join(" ");

    try {
      const response = await this.makeRequest(userMessage);
      await this.handleApiResponse({ message, commandName, event, response });
    } catch (error) {
      console.error("Error in onReply:", error.message);
    }
  }
};