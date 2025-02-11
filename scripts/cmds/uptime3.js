module.exports = {
  config: {
    name: "uptime3",
    version: "2.0",
    author: "Anas x 114",
    role: 2,
    shortDescription: {
      en: "Get futuristic bot stats and uptime!"
    },
    longDescription: {
      en: "Displays bot uptime, user, thread stats, and total messages processed in a digital style."
    },
    category: "system",
    guide: {
      en: "Use {p}uptime to display the bot's stats in a futuristic way."
    }
  },
  onStart: async function ({ api, event, usersData, threadsData, messageCount }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();

      // Calculate formatted uptime
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = `${days}D ${hours}H ${minutes}M ${seconds}S`;

      // Active threads (threads with activity)
      const activeThreads = allThreads.filter(thread => thread.messageCount > 0).length;

      // Total messages processed
      const totalMessages = messageCount || 0; // Replace with actual message count logic if needed

      // Digital-style message design
      const message = `
╔══════════════════════════════════╗
║          🔋 BOT STATS 🔋          ║
╚══════════════════════════════════╝
[⏱️] UPTIME:        ${uptimeString}
[👤] TOTAL USERS:   ${allUsers.length}
[💬] TOTAL THREADS: ${allThreads.length}
[🔥] ACTIVE THREADS:${activeThreads}
[📨] MESSAGES SENT: ${totalMessages}
════════════════════════════════════
💻 SYSTEM ONLINE - KEEP IT RUNNING!
      `;

      api.sendMessage(message.trim(), event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving bot stats.", event.threadID);
    }
  }
};