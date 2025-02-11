const axios = require("axios");
const fs = require("fs-extra");
const os = require("os");
const ytdl = require("@distube/ytdl-core");

module.exports = {
  sentVideos: [],

  config: {
    name: "ff",
    version: "2.0",
    role: 0,
    author: "Kshitiz & SKY",
    cooldowns: 5,
    shortDescription: "",
    longDescription: "get Free Fire edits videos from YouTube",
    category: "𝗚𝗔𝗠𝗘𝗩𝗜𝗗𝗘𝗢",
    dependencies: {
      "fs-extra": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

   onStart: async function ({ api, event, message }) {
      try {
        const senderID = event.senderID;

        const loadingMessage = await api.sendMessage("Loading random Free Fire video 💖...", event.threadID, null, String(event.messageID));

        const apiKey = "AIzaSyAO1tuGus4-S8RJID51f8WJAM7LXz1tVNc";
        const playlistId = "PLCiXFxWx8d2AByHhl7xTg0reGbYHVziWj";

        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=contentDetails&maxResults=50`;
        const response = await axios.get(playlistUrl);

        const items = response.data.items;
        const videoIds = items.map((item) => item.contentDetails.videoId);

        if (this.sentVideos.length === videoIds.length) {
          this.sentVideos = [];
        }

        const unwatchedVideoIds = videoIds.filter((videoId) => !this.sentVideos.includes(videoId));

        if (unwatchedVideoIds.length === 0) {
          api.unsendMessage(String(loadingMessage.messageID));
          return api.sendMessage("something went wrong", event.threadID, null, String(event.messageID));
        }

        const randomVideoId = unwatchedVideoIds[Math.floor(Math.random() * unwatchedVideoIds.length)];

        this.sentVideos.push(randomVideoId);

        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${randomVideoId}&part=snippet,contentDetails`;
        const videoResponse = await axios.get(videoDetailsUrl);

        const videoInfo = videoResponse.data.items[0].snippet;
        const randomVideoTitle = videoInfo.title;

        const stream = ytdl(randomVideoId, { filter: "audioandvideo" });
        const fileName = `${senderID}.mp4`;
        const filePath = __dirname + `/cache/${fileName}`;

        stream.pipe(fs.createWriteStream(filePath));

        stream.on('response', () => {
          console.info('[DOWNLOADER]', 'Starting download now!');
        });

        stream.on('info', () => {
          console.info('[DOWNLOADER]', `Downloading video: ${randomVideoTitle}`);
        });

        stream.on('end', () => {
          console.info('[DOWNLOADER] Downloaded');

          if (fs.statSync(filePath).size > 26214400) {
            fs.unlinkSync(filePath);

            api.unsendMessage(String(loadingMessage.messageID));
            return api.sendMessage('❌ | Give a next try again 🥱', event.threadID, null, String(event.messageID));
          }

          const fileStream = fs.createReadStream(filePath);

          const message = {
            body: `📹 | Here's the random Free Fire video.`,
            attachment: fileStream
          };

          api.sendMessage(message, event.threadID, null, String(event.messageID), (error, info) => {
            fs.unlinkSync(filePath);

            if (error) {
              console.error('[ERROR] Sending message:', error);
              return api.sendMessage('❌ | Error sending the video.', event.threadID, null, String(event.messageID));
            }

            console.info('[INFO] Video sent successfully:', info);

            setTimeout(() => {
              api.unsendMessage(String(loadingMessage.messageID));
            }, 10000);
          });
        });
      } catch (error) {
        console.error('[ERROR]', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID, null, String(event.messageID));
      }
    },
  };