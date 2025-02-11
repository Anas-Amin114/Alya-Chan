const axios = require("axios");
const path = require("path");
const fs = require("fs");

// Fetch Base API URL
const baseApiUrl = async () => {
  try {
    const base = await axios.get(
      `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
    );
    return base.data.api;
  } catch (error) {
    console.error("Error fetching base API URL:", error);
    throw new Error("Unable to fetch the base API URL.");
  }
};

module.exports = {
  config: {
    name: "album",
    version: "1.1.0",
    role: 0,
    author: "Dipto", // Don't Change Author name.
    description: "Displays album options for selection.",
    category: "Media",
    countDown: 5,
    guide: {
      en: "{p}{n} or add [cartoon/photo/lofi/sad/islamic/funny/horny/anime]",
    },
  },

  onStart: async function ({ api, event, args }) {
    const albumOptions = [
      "Funny video",
      "Islamic video",
      "Sad video",
      "Anime video",
      "Cartoon video",
      "LoFi Video",
      "Horny video",
      "Couple Video",
      "Flower Video",
      "Random Photo",
      "Aesthetic Video",
      "Sigma Rule",
      "Lyrics Video",
      "Cat Video",
      "18+ video",
      "Free Fire video",
      "Football video",
      "Girl video",
      "Friends Video",
    ];

    if (!args[0]) {
      api.setMessageReaction("😘", event.messageID, (err) => {}, true);
      const message =
        "❤️‍🩹 Choose an option, Baby 💝\n" +
        "✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
        albumOptions
          .map((option, index) => `${index + 1}. ${option} 🐤`)
          .join("\n") +
        "\n✿━━━━━━━━━━━━━━━━━━━━━━━✿";

      await api.sendMessage(
        message,
        event.threadID,
        (error, info) => {
          if (!error) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              options: albumOptions,
            });
          }
        },
        event.messageID
      );
      return;
    }

    if (args[0] === "list" || args[0] === "listAll") {
      try {
        const response = await axios.get(`${await baseApiUrl()}/album?list=dipto`);
        const data = response.data.data;
        const videoCount = data.match(/\d+/g).reduce((acc, num) => acc + parseInt(num), 0);

        const message =
          args[0] === "list"
            ? `Total video count: ${videoCount}`
            : `🖤 Total videos available in album 🩵\n\n${data}\n\nTotal video count: ${videoCount}`;

        api.sendMessage(message, event.threadID, event.messageID);
      } catch (error) {
        api.sendMessage(
          `An error occurred while fetching the album list: ${error.message}`,
          event.threadID,
          event.messageID
        );
      }
      return;
    }

    // Video Add Functionality
    const validCommands = [
      "cartoon",
      "photo",
      "lofi",
      "sad",
      "islamic",
      "funny",
      "horny",
      "anime",
      "love",
      "lyrics",
      "sigma",
      "aesthetic",
      "cat",
      "flower",
      "ff",
      "sex",
      "football",
      "girl",
      "friend",
    ];

    const command = args[1]?.toLowerCase();
    if (!command || !validCommands.includes(command)) {
      return api.sendMessage(
        "❌ Invalid or missing command. Please specify a valid album type.",
        event.threadID,
        event.messageID
      );
    }

    if (!event.messageReply || !event.messageReply.attachments) {
      return api.sendMessage(
        "⚠️ Please reply to a message with an attachment to add it to the album.",
        event.threadID,
        event.messageID
      );
    }

    const attachment = event.messageReply.attachments[0].url;

    try {
      const response = await axios.get(
        `${await baseApiUrl()}/imgur?url=${encodeURIComponent(attachment)}`
      );
      const imgurLink = response.data.data;

      const fileExtension = path.extname(imgurLink);
      const query = fileExtension === ".mp4" ? "addVideo" : "addPhoto";

      const saveResponse = await axios.get(
        `${await baseApiUrl()}/album?add=${query}&url=${imgurLink}`
      );

      const data = saveResponse.data;
      api.sendMessage(
        `✅ Successfully added to album:\n🔰 ${data.data}\n🔥 URL: ${imgurLink}`,
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error("Error adding to album:", error);
      api.sendMessage(
        `❌ Failed to add to album. Error: ${error.message}`,
        event.threadID,
        event.messageID
      );
    }
  },

  onReply: async function ({ api, event, Reply }) {
    api.unsendMessage(Reply.messageID);

    const replyIndex = parseInt(event.body);
    if (isNaN(replyIndex) || replyIndex < 1 || replyIndex > Reply.options.length) {
      return api.sendMessage(
        "🔰 Please reply with a valid number corresponding to the album option.",
        event.threadID,
        event.messageID
      );
    }

    const query = Reply.options[replyIndex - 1].toLowerCase().replace(/\s+/g, "");

    try {
      const response = await axios.get(`${await baseApiUrl()}/album?type=${query}`);
      const imgUrl = response.data.data;

      const fileExtension = path.extname(imgUrl);
      const imgResponse = await axios.get(imgUrl, { responseType: "arraybuffer" });
      const tempFile = path.join(__dirname, `temp${fileExtension}`);

      fs.writeFileSync(tempFile, Buffer.from(imgResponse.data, "binary"));

      api.sendMessage(
        {
          body: `Here is your ${Reply.options[replyIndex - 1]}: 🔥\nDownload URL: ${imgUrl}`,
          attachment: fs.createReadStream(tempFile),
        },
        event.threadID,
        () => fs.unlinkSync(tempFile),
        event.messageID
      );
    } catch (error) {
      console.error("Error fetching album media:", error);
      api.sendMessage(
        "An error occurred while fetching the media. Please try again later.",
        event.threadID,
        event.messageID
      );
    }
  },
};
