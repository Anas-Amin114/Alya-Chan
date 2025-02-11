const axios = require("axios");
const request = require("request");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "wifey",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 20, // Command cooldown (in seconds)
    role: 0,
    shortDescription: "Get a temporary wifey haha",
    longDescription: "Get a temporary wife, enjoy!",
    category: "fun",
    guide: "{pn} wifey",
  },
  onStart: async function ({ api, event, message }) {
    try {
      // Notify the user that the process is starting
      message.reply("Your temporary wifey is loading 🥵...");

      // Request data from API
      const response = await axios.post("https://your-shoti-api.vercel.app/api/v1/get", {
        apikey: "$shoti-1hecj3cvm6r1mf91948",
      });

      // Check if response data is valid
      if (!response.data || !response.data.data || !response.data.data.url) {
        return api.sendMessage("Error: No valid data returned from the API.", event.threadID, event.messageID);
      }

      // Define the file path to save the video
      const filePath = path.join(__dirname, "/cache/shoti.mp4");
      const file = fs.createWriteStream(filePath);

      // Start downloading the video
      const rqs = request(encodeURI(response.data.data.url));
      rqs.pipe(file);

      // Once the file is downloaded, send it
      file.on("finish", async () => {
        await api.sendMessage(
          {
            body: `@${response.data.data.user.username}\nDamn, your temporary wifey 🥵`,
            attachment: fs.createReadStream(filePath),
          },
          event.threadID,
          event.messageID
        );

        // Clean up the file after sending
        fs.unlinkSync(filePath); // Deletes the temporary video file
      });

      // Handle any download errors
      file.on("error", (err) => {
        api.sendMessage(`Shoti Error: ${err.message}`, event.threadID, event.messageID);
      });
    } catch (error) {
      // General error handling
      api.sendMessage("An error occurred while generating video: " + error.message, event.threadID, event.messageID);
    }
  },
};
