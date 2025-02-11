module.exports.config = {
  name: "spamkick",
  version: "1.0.2",
  role: 0,
  author: "Dipto",
  usePrefix: true,
  description: {
    en: "🚨 Automatically kick a user who spams messages in a group chat 🚨"
  },
  category: "group",
  guide: { en: "📖 [on/off] or [settings]" },
  countDown: 5
};

module.exports.onChat = async ({ api, event, usersData, commandName }) => {
  const { senderID, threadID } = event;
  if (!global.antispam) global.antispam = new Map();

  const threadInfo = global.antispam.has(threadID) ? global.antispam.get(threadID) : { users: {} };
  if (!(senderID in threadInfo.users)) {
    threadInfo.users[senderID] = { count: 1, time: Date.now() };
  } else {
    threadInfo.users[senderID].count++;
    const timePassed = Date.now() - threadInfo.users[senderID].time;
    const messages = threadInfo.users[senderID].count;
    const timeLimit = 80000;
    const messageLimit = 20;

    if (messages > messageLimit && timePassed < timeLimit) {
      if (global.GoatBot.config.adminBot.includes(senderID)) return;
      api.removeUserFromGroup(senderID, threadID, async (err) => {
        if (err) {
          console.error(err);
        } else {
          api.sendMessage({
            body: `🚫 ${await usersData.getName(senderID)} has been removed for spamming. 🚨\n\n📋 **User ID**: ${senderID}\n\n📌 React to this message to add them back! 🔄`,
          }, threadID, (error, info) => {
            global.GoatBot.onReaction.set(info.messageID, {
              commandName,
              uid: senderID,
              messageID: info.messageID
            });
          });
        }
      });

      threadInfo.users[senderID] = { count: 1, time: Date.now() };
    } else if (timePassed > timeLimit) {
      threadInfo.users[senderID] = { count: 1, time: Date.now() };
    }
  }

  global.antispam.set(threadID, threadInfo);
};

module.exports.onReaction = async ({ api, event, Reaction, threadsData, usersData, role }) => {
  const { uid, messageID } = Reaction;
  const { adminIDs, approvalMode } = await threadsData.get(event.threadID);
  const botID = api.getCurrentUserID();
  if (role < 1) return;
  let msg = "";

  try {
    await api.addUserToGroup(uid, event.threadID);
    if (approvalMode === true && !adminIDs.includes(botID)) {
      msg += `✅ Successfully added ${await usersData.getName(uid)} to the approval list. 🛡️`;
    } else {
      msg += `✅ Successfully added ${await usersData.getName(uid)} back to the group. 🎉`;
    }
    await api.unsendMessage(messageID);
  } catch (err) {
    msg += `❌ Failed to add ${await usersData.getName(uid)} back to the group. ⚠️`;
  }
  console.log(msg);
};

module.exports.onStart = async ({ api, event, args }) => {
  switch (args[0]) {
    case "on":
      if (!global.antispam) global.antispam = new Map();
      global.antispam.set(event.threadID, { users: {} });
      api.sendMessage("✅ Spam kick has been turned ON for this group. 🛡️🚨", event.threadID, event.messageID);
      break;
    case "off":
      if (global.antispam && global.antispam.has(event.threadID)) {
        global.antispam.delete(event.threadID);
        api.sendMessage("🚫 Spam kick has been turned OFF for this group. ⚡", event.threadID, event.messageID);
      } else {
        api.sendMessage("⚠️ Spam kick is not currently active in this group. ❌", event.threadID, event.messageID);
      }
      break;
    default:
      api.sendMessage("❓ Please use 'on' to activate or 'off' to deactivate the spam kick feature. ⚙️", event.threadID, event.messageID);
  }
};
