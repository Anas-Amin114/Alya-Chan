const DIG = require("discord-image-generation");
const fs = require("fs-extra");
module.exports = {
	config: {
		name: "blink",
		version: "1.2",
		author: "Al Amin | tanvir",
		countDown: 30,
		role: 0,
		shortDescription: {
			vi: "",
			en: "create blinking gifs"
		},
		longDescription: {
			vi: "",
			en: "generate blinking gifs with profile pictures or multiple images"
		},
		category: "image",
		guide: "{pn} [mention user(s) and/or reply to image(s)]",
		
	},

	onStart: async function ({ event, message, getLang, usersData}) {
		if (event.type === "message_reply") { // if message is a reply to an image
			const links = [];

			for (const item of event.messageReply.attachments) {
				links.push(item.url);
			}

			if (links.length > 0) {
				const img = await new DIG.Blink().getImage(250, ...links);
				const pathSave = `${__dirname}/tmp/Blink.gif`;
				fs.writeFileSync(pathSave, Buffer.from(img));
				message.reply({
					attachment: fs.createReadStream(pathSave)
				}, () => fs.unlinkSync(pathSave));
			} else {
				message.reply("Please reply to an image.");
			}
		} else { // if message includes mentions
			const ids = Object.keys(event.mentions);
			const links = [];

			links.push(await usersData.getAvatarUrl(event.senderID));

			for (const item of ids) {
				links.push(await usersData.getAvatarUrl(item));
			}

			if (links.length > 1) {
				const img = await new DIG.Blink().getImage(150, ...links);
				const pathSave = `${__dirname}/tmp/Blink.gif`;
				fs.writeFileSync(pathSave, Buffer.from(img));
				message.reply({
					attachment: fs.createReadStream(pathSave)
				}, () => fs.unlinkSync(pathSave));
			} else {
				message.reply("Please mention at least two users.");
			}
		}
	}
};