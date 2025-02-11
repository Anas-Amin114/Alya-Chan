const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "pic",
    author: "Anas",
    role: 0,
    shortDescription: "📸 Get a Random Picture!",
    longDescription: "Sends a random picture from the local folder.",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const picFolder = path.join(__dirname, "pictures");

      // Check if the pictures folder exists
      if (!fs.existsSync(picFolder)) {
        fs.mkdirSync(picFolder);
        return api.sendMessage("⚠️ Pictures folder was missing! Created one for you. Please add some images inside the 'pictures' folder.", event.threadID);
      }

      // Get all picture files
      const picFiles = fs.readdirSync(picFolder).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

      if (picFiles.length === 0) {
        return api.sendMessage("⚠️ No pictures found! Please add some images to the 'pictures' folder.", event.threadID);
      }

      // Pick a random picture
      const randomPic = picFiles[Math.floor(Math.random() * picFiles.length)];
      const picPath = path.join(picFolder, randomPic);

      // Send the picture
      api.sendMessage({
        body: "📸 Here's a random picture for you!",
        attachment: fs.createReadStream(picPath)
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error("❌ Error in pic command:", error);
      api.sendMessage("❌ Oops! Something went wrong while sending the picture.", event.threadID);
    }
  }
};