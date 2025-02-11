module.exports = {
  config: {
    name: "ai",
    version: "1.0",
    author: "Riley Nelson",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Generate AI response",
    },
    longDescription: {
      en: "Generate AI response",
    },
    category: "AI",
    guide: {
      en: "!ai [prompt]",
    },
  },
  onStart: async function ({ message }) {
    return message.send("⚠️ Commands must start with the prefix '!'.");
  },
  onChat: async function ({ api, args, message, event }) {
    if (!event.isGroup) return;

    const input = event.body;

    // Ensure the message starts with the prefix '!' and the command 'ai'
    if (!input || !input.startsWith("!ai")) return;

    const data = input.split(" ");
    data.shift(); // Remove the prefix and command
    const prompt = data.join(" ");

    if (!prompt) {
      return message.reply("Please provide a question.");
    }

    try {
      await message.send("✨ 𝗔𝗜 is thinking...");
      const typingIndicator = api.sendTypingIndicator(event.threadID);

      const url = `https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(prompt)}`;

      http.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          typingIndicator();
          try {
            const content = JSON.parse(data).reply;
            message.reply(content);
          } catch (err) {
            console.error("Parsing Error:", err);
            message.reply("Sorry, I couldn't understand the response from the AI server.");
          }
        });
      }).on('error', (err) => {
        console.error("HTTP Request Error:", err);
        message.reply("Sorry, there was an error connecting to the AI server.");
      });

    } catch (error) {
      console.error("API Error:", error);
      message.reply("Sorry, an error occurred. Please try again later.");
    }
  },
};