const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "Anas",
		role: 0,
		shortDescription: "👑 Meet the Royal Owner! 👑",
		longDescription: "Revealing majestic details about the legendary owner, paired with a royal video.",
		category: "admin",
		guide: "{pn} ⚜️"
	},

	onStart: async function ({ api, event }) {
		try {
			console.log("📌 Command 'owner' triggered!"); // Debug log

			// Owner details
			const ownerInfo = {
				name: '👑 Anas Amin 👑',
				gender: '🔥 Male 🔥',
				hobby: '🎮 Gamer Enthusiast | 🚀 Tech Innovator | 💻 Code Virtuoso',
				Fb: '🌐 No Account',
				Relationship: '💔 Single, Focused & Ambitious 💔',
				bio: '⚜️ A visionary in technology and gaming, always striving for excellence. Embracing challenges with unyielding determination and regal passion. ⚜️'
			};

			const videoUrl = 'https://i.imgur.com/SyBjkss.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			// Create tmp folder if it doesn't exist
			await fs.mkdir(tmpFolderPath, { recursive: true });

			// Check if the video file already exists before downloading
			try {
				await fs.access(videoPath);
				console.log("✅ Video already exists, skipping download.");
			} catch {
				console.log("⬇️ Downloading video...");
				const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
				await fs.writeFile(videoPath, Buffer.from(videoResponse.data, 'binary'));
				console.log("✅ Video downloaded successfully!");
			}

			// Message format
			const response = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
               👑 𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼 👑
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💎 𝗡𝗮𝗺𝗲:         ${ownerInfo.name}
🔥 𝗚𝗲𝗻𝗱𝗲𝗿:       ${ownerInfo.gender}
💔 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: ${ownerInfo.Relationship}
🎮 𝗛𝗼𝗯𝗯𝗶𝗲𝘀:      ${ownerInfo.hobby}
🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:    ${ownerInfo.Fb}

⚜️ 𝗕𝗶𝗼: 
    ${ownerInfo.bio}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *"Rule with wisdom, conquer with passion."* ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
			`;

			console.log("📤 Sending message with video...");

			// Send the message with video
			api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, (err, messageInfo) => {
				if (err) {
					console.error("❌ Error sending message:", err);
					return api.sendMessage("❌ Oops! Something went wrong.", event.threadID);
				}

				console.log("✅ Message sent successfully!");

				// Delete video after successful message send
				setTimeout(async () => {
					try {
						await fs.unlink(videoPath);
						console.log("🗑️ Video file deleted successfully.");
					} catch (err) {
						console.error("⚠️ Error deleting video file:", err);
					}
				}, 5000); // 5-second delay before deletion
			}, event.messageID);

			// React to the command message
			api.setMessageReaction('👑', event.messageID, () => {}, true);
		} catch (error) {
			console.error('❌ Error in owner command:', error);
			api.sendMessage('❌ Oops! Something went wrong while processing the command.', event.threadID);
		}
	}
};

// Enable no prefix usage with "!"
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true, prefixes: ["!"] });
