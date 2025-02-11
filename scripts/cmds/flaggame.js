const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json"
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "flag",
    aliases: ["flagGame"],
    version: "3.0",
    author: "Dipto",
    countDown: 0,
    role: 0,
    description: {
      en: "Guess the flag name",
    },
    category: "game",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, args, event, threadsData, usersData }) {
    try {
      if (!args[0]) {
        const response = await axios.get(
          `${await baseApiUrl()}/flagGame?randomFlag=random`
        );
        const { link, country } = response.data;

        await api.sendMessage(
          {
            body: "Guess this flag name.",
            attachment: await global.utils.getStreamFromURL(link),
          },
          event.threadID,
          (error, info) => {
            if (error) return console.error("Error sending message:", error);
            global.GoatBot.onReply.set(info.messageID, {
              commandName: this.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID, // Store the ID of the caller
              link,
              country,
              attempts: 0,
              hasResponded: false, // Track if the caller has already responded
            });
          },
          event.messageID
        );
      } else if (args[0] === "list") {
        const threadData = await threadsData.get(event.threadID);
        const { data } = threadData;
        const flagWins = data.flagWins || {};

        const flagStatsArray = Object.entries(flagWins).sort(
          (a, b) => b[1] - a[1]
        );

        let message = "Flag Game Rankings:\n\n";
        for (const [index, [userID, winCount]] of flagStatsArray.entries()) {
          const userName = await usersData.getName(userID);
          message += `${index + 1}. ${userName}: ${winCount} wins\n`;
        }

        return api.sendMessage(message, event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
    }
  },

  onReply: async function ({ api, event, Reply, usersData, threadsData }) {
    const { country, attempts, author, hasResponded } = Reply;
    const maxAttempts = 1;

    // Silently ignore if the responder is not the command initiator or has already responded
    if (event.senderID !== author || hasResponded) return;

    if (event.type === "message_reply") {
      const reply = event.body.toLowerCase();
      const getCoin = 2 * 420;
      const getExp = 2 * 300;

      if (attempts >= maxAttempts) {
        return api.sendMessage(
          "🚫 | You have reached the maximum number of attempts (1).",
          event.threadID,
          event.messageID
        );
      }

      if (reply === country.toLowerCase()) {
        try {
          const userData = await usersData.get(event.senderID);

          await usersData.set(event.senderID, {
            money: userData.money + getCoin,
            exp: userData.exp + getExp,
            data: userData.data,
          });

          const threadData = await threadsData.get(event.threadID);
          const userID = event.senderID;

          threadData.data.flagWins = threadData.data.flagWins || {};
          threadData.data.flagWins[userID] =
            (threadData.data.flagWins[userID] || 0) + 1;

          await threadsData.set(event.threadID, threadData);

          const message = `✅ | Correct answer!\nYou have earned ${getCoin} coins and ${getExp} exp.`;
          await api.sendMessage(message, event.threadID, event.messageID);

          // Mark that the caller has responded
          Reply.hasResponded = true;
          global.GoatBot.onReply.set(Reply.messageID, Reply);
        } catch (err) {
          console.error("Error updating user data:", err.message);
          await api.sendMessage(
            "There was an error updating your balance. Please try again later.",
            event.threadID,
            event.messageID
          );
        }
      } else {
        Reply.attempts += 1;
        Reply.hasResponded = true; // Mark that the caller has responded
        global.GoatBot.onReply.set(Reply.messageID, Reply);
        api.sendMessage(
          `❌ | Wrong Answer. You have no attempts left.\n✅ | Better luck next time!`,
          event.threadID,
          event.messageID
        );
      }
    }
  },
};