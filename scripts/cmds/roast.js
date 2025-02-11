const axios = require("axios");

module.exports = {
  config: {
    name: "roast",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Insult someone by using this cmd",
    category: "𝗙𝗨𝗡",
    guide: "{pn} @mention",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const mention = Object.keys(event.mentions);

      if (mention.length !== 1) {
        api.sendMessage("Please mention one person to insult.", event.threadID);
        return;
      }

      const mentionID = mention[0];
      const mentionName = event.mentions[mentionID].replace("@", "");

      // List of VIP user IDs
      const vipUsers = ["61560891464600"]; // Replace with actual user IDs of VIPs

      // Get thread info to check if the mentioned user is an admin
      const threadInfo = await api.getThreadInfo(event.threadID);
      const isAdmin = threadInfo.adminIDs.some(admin => admin.id === mentionID);

      // Check if the mentioned user is an admin or a VIP
      if (isAdmin || vipUsers.includes(mentionID)) {
        api.sendMessage("Ayo Gay You can't insult my owner🤬", event.threadID);
        return;
      }

      // Handle special name condition
      if (mentionName.toLowerCase().includes("kshitiz")) {
        api.sendMessage("Ayo Gay You can't insult my owner🤬", event.threadID);
        return;
      }

      // Fetch an insult
      const url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
      const response = await axios.get(url);
      const insult = response.data.insult;

      const insultMessage = `${mentionName}, ${insult}`;
      api.sendMessage(insultMessage, event.threadID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Error!", event.threadID);
    }
  },
};