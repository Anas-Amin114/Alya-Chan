module.exports = {
    config: {
        name: "khaico",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "khaico") return message.reply(" 𝗡𝗮 𝗮𝗺𝗶 𝗸𝗵𝗮𝗶 𝗻𝗮,𝗧𝘂𝗺𝗶 𝗸𝗵𝗮𝘄<😒");
}
};