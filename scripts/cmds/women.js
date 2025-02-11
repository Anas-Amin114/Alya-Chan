const fs = require('fs');

module.exports = {
  config: {
    name: "women",
    version: "1.0",
    author: "otineeeeyyyy",
    countDown: 5,
    role: 0,
    shortDescription: "Responds to the keyword 'women'",
    longDescription: "Replies with a message and video attachment when the keyword 'women' is detected.",
    category: "group",
  },

  // Initialization logic (if any)
  onStart: async function () {
    console.log("Women module initialized successfully.");
  },

  // Message handler
  onChat: async function ({ event, message, getLang }) {
    try {
      // Ensure the message body exists and normalize it to lowercase
      if (event.body && event.body.toLowerCase() === "women") {
        const filePath = "women.mp4"; // Path to the video file

        // Check if the file exists before sending
        if (fs.existsSync(filePath)) {
          return message.reply({
            body: "Women ☕",
            attachment: fs.createReadStream(filePath),
          });
        } else {
          // Handle the case where the file is missing
          return message.reply("The video file 'women.mp4' is missing. Please check the file path.");
        }
      }
    } catch (error) {
      // Catch and log errors
      console.error("Error in women module:", error);
      return message.reply("An error occurred while processing your request. Please try again later.");
    }
  },
};
