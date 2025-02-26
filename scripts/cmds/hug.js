const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
    config: {
        name: "hug",
        version: "1.0",
        author: "SiAM",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Send a hug gif to one or two mentioned users.",
        },
        longDescription: {
            en: "This command sends a hug gif to one or two mentioned users.",
        },
        category: "Fun",
        guide: {
            en: "To use this command, type /hug followed by one or two user mentions.",
        },
    },

    onStart: async function ({
        api,
        args,
        message,
        event,
        threadsData,
        usersData,
        dashBoardData,
        globalData,
        threadModel,
        userModel,
        dashBoardModel,
        globalModel,
        role,
        commandName,
        getLang,
    }) {

        const { getPrefix } = global.utils;
        const p = getPrefix(event.threadID);
       
        let uid1 = null,
            uid2 = null;
        const input = args.join(" ");
      
        const userInfo1 = await api.getUserInfo(uid1);
        const userInfo2 = await api.getUserInfo(uid2);
        const userName1 = userInfo1[uid1].name.split(' ').pop();
        const userName2 = userInfo2[uid2].name.split(' ').pop();

        const apiUrl = "https://nekos.best/api/v2/hug?amount=1";
        axios
            .get(apiUrl)
            .then(async (response) => {
                const gifUrl = response.data.results[0].url;
                const imageResponse = await axios.get(gifUrl, { responseType: "arraybuffer" });
                const outputBuffer = Buffer.from(imageResponse.data, "binary");
                fs.writeFileSync(`${uid1}_${uid2}_hug.gif`, outputBuffer);

                message.reply({
                    body: `${userName1} 🤗 ${userName2}`,
                    attachment: fs.createReadStream(`${uid1}_${uid2}_hug.gif`),
                }, () => fs.unlinkSync(`${uid1}_${uid2}_hug.gif`));
            })
            .catch((error) => {
                console.log(error);
                message.reply("There was an error processing the hug gif.");
            });
    },
};
