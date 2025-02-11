const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "2.0",
    author: "NTKhang (Modified by Assistant)",
    countDown: 5,
    role: 0,
    description: "Change the bot command prefix for your chat group or globally (admin only)",
    category: "config",
    guide: {
      vi: "   {pn} <new prefix>: Thay đổi prefix mới trong nhóm của bạn"
        + "\n   Ví dụ:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: Thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
        + "\n   Ví dụ:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: Đặt lại prefix trong nhóm của bạn về mặc định",
      en: "   {pn} <new prefix>: Change the command prefix in your chat group"
        + "\n   Example:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: Change the command prefix globally (admin only)"
        + "\n   Example:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: Reset the prefix in your chat group to default"
    }
  },

  langs: {
    vi: {
      reset: "\uD83D\uDD04 Đã đặt lại prefix của bạn về mặc định: %1",
      onlyAdmin: "\uD83D\uDEE1️ Chỉ admin mới có thể thay đổi prefix của hệ thống bot",
      confirmGlobal: "\uD83D\uDCDA Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix toàn hệ thống bot",
      confirmThisThread: "\uD83D\uDCDA Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm của bạn",
      successGlobal: "\u2728 Đã thay đổi prefix toàn hệ thống thành: %1",
      successThisThread: "\uD83C\uDF89 Đã thay đổi prefix trong nhóm của bạn thành: %1",
      myPrefix: "\uD83D\uDC8E Prefix hệ thống: %1\n\uD83C\uDF10 Prefix nhóm của bạn: %2"
    },
    en: {
      reset: "\uD83D\uDD04 Your prefix has been reset to default: %1",
      onlyAdmin: "\uD83D\uDEE1️ Only admins can change the global system prefix",
      confirmGlobal: "\uD83D\uDCDA Please react to this message to confirm changing the global system prefix",
      confirmThisThread: "\uD83D\uDCDA Please react to this message to confirm changing the prefix in your chat group",
      successGlobal: "\u2728 Global system prefix changed to: %1",
      successThisThread: "\uD83C\uDF89 Prefix for your chat group changed to: %1",
      myPrefix: "\uD83D\uDC8E System prefix: %1\n\uD83C\uDF10 Your chat group prefix: %2"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.SyntaxError();

    const newPrefix = args[0];

    // Validate new prefix
    if (newPrefix.length > 5 || newPrefix.trim() === "") {
      return message.reply("\u26A0 Prefix should be a non-empty string and no longer than 5 characters.");
    }

    if (args[0] === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix
    };

    if (args[1] === "-g") {
      if (role < 2) {
        return message.reply(getLang("onlyAdmin"));
      }
      formSet.setGlobal = true;
    } else {
      formSet.setGlobal = false;
    }

    return message.reply(
      args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"),
      (err, info) => {
        formSet.messageID = info.messageID;
        global.GoatBot.onReaction.set(info.messageID, formSet);

        // Set a timeout to cancel the reaction after 60 seconds
        setTimeout(() => {
          global.GoatBot.onReaction.delete(info.messageID);
        }, 60000);
      }
    );
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;

    if (event.userID !== author) return;

    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      return message.reply(
        getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID))
      );
    }
  }
};
