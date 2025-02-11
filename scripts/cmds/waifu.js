const axios = require('axios');

module.exports = {
	config: {
		name: "waifu",
		aliases: ["wife"],
		version: "1.1",
		author: "tas3n",
		countDown: 6,
		role: 0,
		shortDescription: "Get random waifu or other character images.",
		longDescription: "Get waifu, neko, shinobu, megumin, bully, cuddle, cry, kiss, lick, hug, awoo, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe images.",
		category: "anime",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ").toLowerCase();
		const validCategories = [
			"waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "kiss", "lick", 
			"hug", "awoo", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", 
			"handhold", "nom", "bite", "glomp", "slap", "kill", "kick", "happy", "wink", "poke", 
			"dance", "cringe"
		];

		// Default to "waifu" if no category is specified
		const category = validCategories.includes(name) ? name : "waifu";

		try {
			let res = await axios.get(`https://api.waifu.pics/sfw/${category}`);

			let res2 = res.data;
			let img = res2.url;

			const form = {
				body: `「 𝔀𝓪𝓲𝓯𝓾 」\nCategory: ${category.charAt(0).toUpperCase() + category.slice(1)}`
			};

			if (img) {
				form.attachment = await global.utils.getStreamFromURL(img);
			}

			message.reply(form);
		} catch (e) {
			message.reply(`Error fetching image or invalid category. Try one of the following categories: ${validCategories.join(", ")}`);
		}
	}
};
