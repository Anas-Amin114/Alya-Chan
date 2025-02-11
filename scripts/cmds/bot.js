module.exports = {
    config: {
        name: "bot",
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
    if (event.body && event.body.toLowerCase() == "bot") return message.reply(" 𝗔𝗺𝗶 𝗕𝗼𝘁 𝗻𝗮 𝗴𝗼 𝗯𝗮𝗯𝗲 𝗔𝗺𝗶 𝗠𝗮𝗵𝗶 𝗥𝗼𝗯𝗼𝘁😚𝗰𝗵𝗲𝗹𝗲𝗱𝗲𝗿 𝗴𝗳 𝗿 𝗺𝗲𝘆𝗲𝗱𝗲𝗿 𝗯𝗳🫣");
}
};