module.exports = {
  config: {
    name: "membercount",
    version: "1.1",
    author: "Anas",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "📊 Đếm thành viên nhóm",
      en: "📊 Count group members"
    },
    longDescription: {
      vi: "📈 Xem số lượng thành viên trong nhóm một cách dễ dàng",
      en: "📈 Easily view the number of members in the group"
    },
    category: "box chat",
    guide: {
      vi: "   {pn}: dùng để xem số lượng thành viên trong nhóm",
      en: "   {pn}: used to view the number of members in the group"
    }
  },

  langs: {
    vi: {
      count: "👥 Số lượng thành viên trong nhóm là:",
      noMembers: "⚠️ Hiện tại nhóm không có thành viên nào!"
    },
    en: {
      count: "👥 Number of members in the group:",
      noMembers: "⚠️ The group currently has no members!"
    }
  },

  onStart: async function ({ threadsData, message, event, api, getLang }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const { members } = threadData;

    if (members && members.length > 0) {
      const memberCount = members.length;
      message.reply(`${getLang("count")} ${memberCount} 👤`);
    } else {
      message.reply(getLang("noMembers"));
    }
  },

  onChat: async ({ threadsData, event, api }) => {
    const { senderID, threadID } = event;
    const members = (await threadsData.get(threadID, "members")) || [];

    if (!members.some(member => member.userID === senderID)) {
      const userName = (await api.getUserInfo(senderID))[senderID]?.name || "Unknown User";
      members.push({
        userID: senderID,
        name: userName
      });
    }

    await threadsData.set(threadID, members, "members");
  }
};