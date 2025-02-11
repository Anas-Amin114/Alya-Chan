const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "mistake",
    aliases: ["mistake"],
    version: "1.0",
    author: "otineeyy",
    countDown: 2,
    role: 0,
    shortdescription: "a mistake",
    longDescription: "a small mistake (mention someone)", 
    category: "fun",
    guide: ""
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);

    if (mention.length === 0) {
      message.reply("Please mention someone.");
      return;
    }

    let one = mention[0];

    // Restrict for the specified UID
    if (one === "100078140834638") {
      message.reply("You are the mistake bro 🐸🐸.");
      return;
    }

    try {
      const imagePath = await bal(one);
      await message.reply({
        body: "The Biggest Mistake on Earth",
        attachment: fs.createReadStream(imagePath),
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("An error occurred while processing your request.");
    }
  },
};

async function bal(one) {
  const avatarone = await jimp.read(
    `https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
  );
  const image = await jimp.read("https://i.postimg.cc/2ST7x1Dw/received-6010166635719509.jpg");
  image.resize(512, 512).composite(avatarone.resize(220, 203), 145, 305);

  // Set path to save the image in the tmp folder
  const tmpDir = path.join(__dirname, "tmp"); // Assuming "tmp" folder is in the same directory
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir); // Create the tmp folder if it doesn't exist
  }

  const imagePath = path.join(tmpDir, "mistake.png");

  await image.writeAsync(imagePath);
  return imagePath;
}