module.exports = {
 config: {
	 name: "anasgf",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
   if (event.body && event.body.toLowerCase() === "!anasgf") {
     return message.reply({
       body: " 「 BESSAR BUKE\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n𝐌𝐎𝐇𝐀𝐌𝐌𝐀𝐃 𝐀𝐍𝐀𝐒」",
       attachment: await global.utils.getStreamFromURL("https://i.imgur.com/nWD4xk3.mp4")
     });
   }
 }
}