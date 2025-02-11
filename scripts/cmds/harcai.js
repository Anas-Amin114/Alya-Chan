const axios = require("axios");

module.exports = {
  config: {
    name: "hercai",
    version: "1.0",
    author: "Xyron Chen",
    countDown: 10,
    role: 0,
    category: "professor Ai"
  },
  onStart: async function({ message, event, args, commandName }) {
  const prompt = args.join(' ');
  
  try {
    const baduy = await message.reply(`Hercai is thinking... please wait a moment.`);
    message.reaction("🤔", event.messageID, () => {}, true);
    message.reaction("💜", baduy.messageID, () => {}, true);
    
    const response = await axios.get(`https://hercai.miraixyxy.repl.co/hercaiapi?prompt=${encodeURIComponent(prompt)}`);

    if (response.data && response.data.reply) {
      const answer = response.data.reply;
      const sagot = `${answer}`;
      message.reply({ body: sagot,
                  
                    }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } 
    message.unsend(baduy.messageID);

  } catch (error) {
    console.error("Error:", error.message);
  }
},

onReply: async function({ message, event, Reply, args }) {
  let { author, commandName } = Reply;
  if (event.senderID != author) return;
  const text = args.join(' ');
   try {
     const boring = await message.send(`Hercai is thinking... please wait a moment.`);
     message.reaction("🤔", event.messageID, () => {}, true);
     message.reaction("💜", boring.messageID, () => {}, true);
    const response = await axios.get(`https://hercai.miraixyxy.repl.co/hercaiapi?prompt=${encodeURIComponent(text)}`);
    
    if (response.data && response.data.reply) {
      const answer = response.data.reply;
      const sagot2 = `${answer}`;
      message.reply({ body: sagot2,
                    
                    }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    }
    message.unsend(boring.messageID);

  } catch (error) {
    console.error("Error:", error.message);
  }
}
};