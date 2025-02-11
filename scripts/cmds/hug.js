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
        const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
        const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
        const bypassmUid = event.senderID;
        
        if (bypassmain.includes(bypassmUid)) {
            console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
        } else {
            const threadmID = event.threadID;
            if (!approvedmain.includes(threadmID)) {
                const msgSend = message.reply(`cmd 'hug' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
                setTimeout(async () => {
                    message.unsend((await msgSend).messageID);
                }, 40000);
                return;
            }
        }

        let uid1 = null,
            uid2 = null;
        const input = args.join(" ");
        
        // Only support hugging Anas (100084690500330)
        if (event.mentions && Object.keys(event.mentions).length === 1) {
            uid1 = event.senderID;
            uid2 = "100084690500330";  // Set to Anas's UID (100084690500330)
        } else {
            return message.reply("Please mention one user (Anas) to send a hug gif.");
        }

        // Informing the user that only Anas can receive hugs
        if (uid2 !== "100084690500330") {
            return message.reply("Sorry, I only hug Anas (100084690500330) 😌💗");
        }

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
