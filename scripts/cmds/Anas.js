module.exports = {
  config: {
    name: "anas",
    version: "1.0",
    author: "Anas",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const prefix = "!"; // Define the prefix

    // Fix: Correct string comparison
    if (event.body && event.body.toLowerCase() === prefix + "anas") {  
      return message.reply({
        body: "「❥︎----ღ᭄_ᴬˢˢᴬᴸᴬᴹᴼᴸᴬᴵᴷᵁᴹ ..\n❥︎----ღ᭄_  ᴮᴿᴼᵀᴴᴱᴿ❞࿐.🌴.\n❥ ᴍᴏʜᴀᴍᴍᴀᴅ ᴀɴᴀs\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐀𝐍𝐀𝐒」",
        attachment: await global.utils.getStreamFromURL("https://i.imgur.com/XlyIOMR.mp4"),
      });
    }
  },
};
