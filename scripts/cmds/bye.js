module.exports = {
    config: {
        name: "bye",
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
    if (event.body && event.body.toLowerCase() == "bye") return message.reply(" 𝗠𝗮𝘆 𝗔𝗹𝗹𝗮𝗵 𝗯𝗹𝗲𝘀𝘀 𝗨 𝗯𝗮𝗯𝘆 𝗔𝗻𝗱 𝗧𝗮𝗸𝗲 𝗖𝗮𝗿𝗲😚 ");
}
};