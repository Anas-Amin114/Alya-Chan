const fs = require('fs');

module.exports = {
	config: {
		name: "cum",
		version: "1.0",
		author: "AceGun",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "",
			en: "Sends a random cumshot image."
		},
		longDescription: {
			vi: "",
			en: "Sends a random cumshot image."
		},
		category: "nsfw 🔞",
		guide: {
			en: "{pn}"
		},
		envConfig: {}
	},

	onStart: async function ({ message }) {
		const json = JSON.parse(fs.readFileSync('cum.json'));
		const data = json[Math.floor(Math.random() * json.length)];
		const link = data.link;

		message.reply({
			body: '「 Senpaiii 」', attachment: await global.utils.getStreamFromURL(link)
		});
	}
};