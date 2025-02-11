const axios = require("axios");

module.exports = {
    config: {
        name: "emojimix",
        version: "1.4",
        author: "NTKhang",
        countDown: 5,
        role: 0,
        description: {
            vi: "Mix 2 emoji lại với nhau",
            en: "Mix 2 emoji together"
        },
        guide: {
            vi: "   {pn} <emoji1> <emoji2>"
                + "\n   Ví dụ:  {pn} 🤣 🥰",
            en: "   {pn} <emoji1> <emoji2>"
                + "\n   Example:  {pn} 🤣 🥰"
        },
        category: "fun"
    },

    langs: {
        vi: {
            error: "Rất tiếc, emoji %1 và %2 không mix được",
            success: "Emoji %1 và %2 mix được %3 ảnh"
        },
        en: {
            error: "Sorry, emoji %1 and %2 can't mix",
            success: "Emoji %1 and %2 mix %3 images"
        }
    },

    onStart: async function ({ message, args, getLang }) {
        const emoji1 = args[0];
        const emoji2 = args[1];

        // Check if both emojis are provided
        if (!emoji1 || !emoji2) return message.SyntaxError();

        // Generate the emojimix images
        const results = await generateEmojimix(emoji1, emoji2);

        // If no results were found
        if (!results || results.length === 0)
            return message.reply(getLang("error", emoji1, emoji2));

        // If results found, send the reply
        message.reply({
            body: getLang("success", emoji1, emoji2, results.length),
            attachment: results
        });
    }
};

// Function to generate emojimix images
async function generateEmojimix(emoji1, emoji2) {
    try {
        const { data: response1 } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
            params: {
                emoji1,
                emoji2
            },
            responseType: "stream"
        });
        
        const { data: response2 } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
            params: {
                emoji1: emoji2,
                emoji2: emoji1
            },
            responseType: "stream"
        });

        const results = [];
        if (response1) {
            response1.path = `emojimix_${emoji1}_${emoji2}_${Date.now()}.png`;
            results.push(response1);
        }
        if (response2) {
            response2.path = `emojimix_${emoji2}_${emoji1}_${Date.now()}.png`;
            results.push(response2);
        }

        return results;
    } catch (e) {
        console.error(e);
        return [];
    }
}
