module.exports = {
  config: {
    name: "respect",
    aliases: [],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin privileges in the thread and shows a respectful message.",
    category: "owner",
    guide: "{pn} respect",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);

      const permission = ["100078140834638", "100084690500330"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          "⚡ Hey you, can't mess with the boss! 🙄 Try again later! 💥",
          event.threadID,
          event.messageID
        );
      }

      const threadID = event.threadID;
      const adminID = event.senderID;

      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        "🙏 My Boss, I bow down to you! Your greatness shines in every moment. 🥰✨",
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("😓 My Lord, I failed to make you an admin. Please try again later! 💔", event.threadID);
    }
  },
};
