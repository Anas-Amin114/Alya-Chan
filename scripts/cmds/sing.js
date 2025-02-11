const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');
const { getStreamFromURL, shortenURL, randomString } = global.utils;

const API_KEYS = [
    'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
    '719775e815msh65471c929a0203bp10fe44jsndcb70c04bc42',
    'a2743acb5amsh6ac9c5c61aada87p156ebcjsnd25f1ef87037',
    '8e938a48bdmshcf5ccdacbd62b60p1bffa7jsn23b2515c852d',
    'f9649271b8mshae610e65f24780cp1fff43jsn808620779631',
    '8e906ff706msh33ffb3d489a561ap108b70jsne55d8d497698',
    '4bd76967f9msh2ba46c8cf871b4ep1eab38jsn19c9067a90bb',
];

async function video(api, event, args, message) {
    api.setMessageReaction("🕢", event.messageID, (err) => {}, true);
    try {
        let title = '';
        let shortUrl = '';
        let videoId = '';
        let videoQuality = args[args.length - 1].toLowerCase().includes('p') ? args.pop() : '720p'; // Default to 720p

        const extractShortUrl = async () => {
            const attachment = event.messageReply.attachments[0];
            if (attachment.type === "video" || attachment.type === "audio") {
                return attachment.url;
            } else {
                throw new Error("Invalid attachment type.");
            }
        };

        const getRandomApiKey = () => {
            const randomIndex = Math.floor(Math.random() * API_KEYS.length);
            return API_KEYS[randomIndex];
        };

        const retryRequest = async (url, retries = 3) => {
            let lastError;
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const response = await axios.get(url);
                    return response;
                } catch (error) {
                    lastError = error;
                    console.error(`Attempt ${attempt} failed: ${error.message}`);
                    if (attempt < retries) await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before retrying
                }
            }
            throw lastError;
        };

        if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments.length > 0) {
            shortUrl = await extractShortUrl();
            const musicRecognitionResponse = await retryRequest(`https://audio-recon-ahcw.onrender.com/kshitiz?url=${encodeURIComponent(shortUrl)}`);
            title = musicRecognitionResponse.data.title;
            const searchResponse = await retryRequest(`https://youtube-kshitiz-gamma.vercel.app/yt?search=${encodeURIComponent(title)}`);
            if (searchResponse.data.length > 0) {
                videoId = searchResponse.data[0].videoId;
            }

            shortUrl = await shortenURL(shortUrl);
        } else if (args.length === 0) {
            message.reply("Please provide a video name or reply to a video or audio attachment.");
            return;
        } else {
            title = args.join(" ");
            const searchResponse = await retryRequest(`https://youtube-kshitiz-gamma.vercel.app/yt?search=${encodeURIComponent(title)}`);
            if (searchResponse.data.length > 0) {
                videoId = searchResponse.data[0].videoId;
            }

            const videoUrlResponse = await retryRequest(`https://yt-kshitiz.vercel.app/download?id=${encodeURIComponent(videoId)}&apikey=${getRandomApiKey()}`);
            if (videoUrlResponse.data.length > 0) {
                shortUrl = await shortenURL(videoUrlResponse.data[0]);
            }
        }

        if (!videoId) {
            message.reply("No video found for the given query.");
            return;
        }

        const downloadResponse = await retryRequest(`https://yt-kshitiz.vercel.app/download?id=${encodeURIComponent(videoId)}&apikey=${getRandomApiKey()}&quality=${videoQuality}`);
        const videoUrl = downloadResponse.data[0];

        if (!videoUrl) {
            message.reply("Failed to retrieve download link for the video.");
            return;
        }

        // Check if video is cached
        const cachedPath = path.join(__dirname, "cache", `${videoId}.mp3`);
        if (fs.existsSync(cachedPath)) {
            const videoStream = fs.createReadStream(cachedPath);
            message.reply({ body: `📹 Playing: ${title}`, attachment: videoStream });
            api.setMessageReaction("✅", event.messageID, () => {}, true);
            return;
        }

        const writer = fs.createWriteStream(cachedPath);
        const response = await axios({
            url: videoUrl,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        writer.on('finish', () => {
            const videoStream = fs.createReadStream(cachedPath);
            message.reply({ body: `📹 Playing: ${title}`, attachment: videoStream });
            api.setMessageReaction("✅", event.messageID, () => {}, true);
        });

        writer.on('error', (error) => {
            console.error("Error:", error);
            message.reply("Error downloading the video.");
        });
    } catch (error) {
        console.error("Error:", error);
        message.reply("An error occurred.");
    }
}

module.exports = {
    config: {
        name: "sing", 
        version: "1.1",
        author: "Vex_Kshitiz",
        countDown: 10,
        role: 0,
        shortDescription: "Play audio from YouTube",
        longDescription: "Play audio from YouTube with support for audio recognition and video quality selection.",
        category: "music",
        guide: "{p} audio videoname [quality] / reply to audio or video"
    },
    onStart: function ({ api, event, args, message }) {
        return video(api, event, args, message);
    }
};
