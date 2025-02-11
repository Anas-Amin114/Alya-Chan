const fs = require('fs');//please add music or video and move that all file inside scripts/cmdsnonprefix and replace that music name in the code or vdo if you want toset vdo just replace .mp3 with .mp4

module.exports = {
  config: {
    name: "noprefix",
    version: "1.0",
    author: "A Dil",
    countDown: 5,
    role: 0,
	description: {
		en: "no prefix. Type 𝐀𝐫𝐚/𝐘𝐨𝐰𝐚𝐢𝐦𝐨/𝐘𝐚𝐦𝐞𝐭𝐞/𝐁𝐚𝐧𝐤𝐚𝐢/𝐔𝐦𝐚𝐢/𝐎𝐧𝐢𝐜𝐡𝐚𝐧/𝐈𝐭𝐚𝐜𝐡𝐢/𝐔𝐳𝐮𝐦𝐚𝐤𝐢/𝐃𝐚𝐭𝐭𝐞𝐛𝐚𝐲𝐨/𝐑𝐚𝐬𝐞𝐧𝐠𝐚𝐧"
	},
    shortDescription: "no prefix",
    longDescription: "no prefix. Type 𝐀𝐫𝐚/𝐘𝐨𝐰𝐚𝐢𝐦𝐨/𝐘𝐚𝐦𝐞𝐭𝐞/𝐁𝐚𝐧𝐤𝐚𝐢/𝐔𝐦𝐚𝐢/𝐎𝐧𝐢𝐜𝐡𝐚𝐧/𝐈𝐭𝐚𝐜𝐡𝐢/𝐔𝐳𝐮𝐦𝐚𝐤𝐢/𝐃𝐚𝐭𝐭𝐞𝐛𝐚𝐲𝐨/𝐑𝐚𝐬𝐞𝐧𝐠𝐚𝐧",
    category: "no prefix",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "ara":
          message.reply({
            body: "「 𝐀𝐫𝐚 𝐚𝐫𝐚😜 」",
            attachment: fs.createReadStream("ara.mp3"),
          });
          await api.setMessageReaction("😜", event.messageID, event.threadID, api);
        break;
case "yamete":
          message.reply({
            body: "「 𝐘𝐚𝐦𝐞𝐭𝐞 𝐤𝐮𝐝𝐚𝐬𝐚𝐢💋😛 」",
            attachment: fs.createReadStream("yamete.mp3"),
          });
          await api.setMessageReaction("😛", event.messageID, event.threadID, api);
   case "machikney":
          message.reply({
            body: "「 Machikney 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/machikney.mp3"),
          });
          await api.setMessageReaction("🤨", event.messageID, event.threadID, api);
case "haha":
          message.reply({
            body: "「 Na Has Hai muji 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/haha.mp3"),
          });
          await api.setMessageReaction("😒", event.messageID, event.threadID, api);
  case "bankai":
          message.reply({
            body: "「 𝐁𝐚𝐧𝐤𝐚𝐢⛩️ 」",
            attachment: fs.createReadStream("bankai.mp3"),
          });
          await api.setMessageReaction("😈", event.messageID, event.threadID, api);
          case "yowaimo":
          message.reply({
            body: "「 𝐘𝐨𝐰𝐚𝐢𝐦𝐨🤞 」",
            attachment: fs.createReadStream("yowaimo.mp3"),
          });
          await api.setMessageReaction("🤞", event.messageID, event.threadID, api);
        case "umai":
          message.reply({
            body: "「 𝐔𝐦𝐚𝐢😤😤 」",
            attachment: fs.createReadStream("umai.mp3"),
          });
          await api.setMessageReaction("🐸", event.messageID, event.threadID, api);
		  case "onichan":
          message.reply({
            body: "「 🍒𝐎𝐧𝐢𝐜𝐡𝐚𝐧🍒 」",
            attachment: fs.createReadStream("onichan.mp3"),
          });
          await api.setMessageReaction("🍒", event.messageID, event.threadID, api);
		  case "itachi":
          message.reply({
            body: "「 𝐈𝐭𝐚𝐜𝐡𝐢🐦‍⬛ 」",
            attachment: fs.createReadStream("itachi.mp3"),
          });
          await api.setMessageReaction("🐦‍⬛", event.messageID, event.threadID, api);
		  case "uzumaki":
          message.reply({
            body: "「 𝐔𝐳𝐮𝐦𝐚𝐤𝐢🦊 」",
            attachment: fs.createReadStream("uzumaki.mp3"),
          });
          await api.setMessageReaction("🦊", event.messageID, event.threadID, api);
		  case "dattebayo":
          message.reply({
            body: "「 𝐃𝐚𝐭𝐭𝐞𝐛𝐚𝐲𝐨🍥 」",
            attachment: fs.createReadStream("dattebayo.mp3"),
          });
          await api.setMessageReaction("🍥", event.messageID, event.threadID, api);
		   case "rasengan":
          message.reply({
            body: "「 𝐑𝐚𝐬𝐞𝐧𝐠𝐚𝐧🌀 」",
            attachment: fs.createReadStream("rasengan.mp3"),
          });
          await api.setMessageReaction("🌀", event.messageID, event.threadID, api);
   default:
          return;
      }
    }
  }
};