module.exports = {
	config: {
		name: "uptime",
		aliases: ["up", "upt"],
		version: "1.1",
		author: "XyryllPanget",
		role: 0,
		shortDescription: {
			en: "⏱️ Display the bot's uptime."
		},
		longDescription: {
			en: "⏰ See how long the bot has been running without interruptions."
		},
		category: "System",
		guide: {
			en: "Use {p}uptime to display the bot's uptime. 🕒"
		}
	},
	onStart: async function ({ api, event }) {
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / 3600) % 24);
		const days = Math.floor(uptime / (3600 * 24));

		const uptimeString = 
			`${days > 0 ? `🗓️ ${days} day${days > 1 ? 's' : ''}, ` : ""}` +
			`${hours > 0 ? `⏰ ${hours} hour${hours > 1 ? 's' : ''}, ` : ""}` +
			`${minutes > 0 ? `🕒 ${minutes} minute${minutes > 1 ? 's' : ''}, ` : ""}` +
			`⏳ ${seconds} second${seconds > 1 ? 's' : ''}`;

		api.sendMessage(
			`💡 Hello, user! The bot has been running for:\n` +
			`✨ ${uptimeString}. 🚀`, 
			event.threadID
		);
	}
};
