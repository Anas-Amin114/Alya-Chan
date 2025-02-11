module.exports = {
  config: {
    name: 'impress',
    version: '2.3', // Updated version number, updated by Anas Amin
    author: 'Anas',
    countDown: 5,
    role: 0,
    category: 'fun',
    shortDescription: {
      en: 'Tells a random pickup line to impress someone 💘'
    },
    longDescription: {
      en: 'Use this command to impress a girl or someone you like with a fun pickup line. 😘'
    },
    guide: {
      en: '{pn} impress @mention'
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const mention = Object.keys(event.mentions);

      // Ensure exactly one person is mentioned
      if (mention.length !== 1) {
        api.sendMessage('🙅‍♂️ Please mention **exactly one person** to impress! 💕', event.threadID, event.messageID);
        return;
      }

      const mentionID = mention[0];
      const mentionName = event.mentions[mentionID].replace('@', '');

      // Expanded list of pickup lines
      const pickupLines = [
        "Are you a magician? Because whenever I look at you, everyone else disappears. 🪄",
        "Do you have a name, or can I call you mine? 😘",
        "Are you French? Because Eiffel for you. 🗼",
        "Do you have a map? I just keep getting lost in your eyes. 🗺️",
        "Are you a bank loan? Because you have my interest! 💸",
        "Do you have a Band-Aid? Because I just scraped my knee falling for you. 🩹",
        "Are you Wi-Fi? Because I'm feeling a strong connection. 📶",
        "If you were a vegetable, you’d be a cute-cumber. 🥒",
        "Are you a time traveler? Because I can see you in my future. ⏳",
        "Do you believe in love at first sight—or should I walk by again? 👀",
        "Are you a parking ticket? Because you’ve got FINE written all over you. 🚗",
        "Is your name Google? Because you have everything I’ve been searching for. 🔍",
        "Do you have a sunburn, or are you always this hot? ☀️",
        "If you were a fruit, you’d be a fineapple. 🍍",
        "Are you a snowstorm? Because you’ve just made my heart freeze. ❄️",
        "Do you have a pencil? Because I want to erase your past and write our future. ✏️",
        "Are you a light bulb? Because you brighten up my day. 💡",
        "You must be a magician because whenever I look at you, everyone else disappears. ✨",
        "Are you a camera? Because every time I look at you, I smile. 📸",
        "Do you have a compass? Because I just got lost in your eyes. 🧭",
        "Are you chocolate? Because you're sweet and irresistible. 🍫",
        "Is your name Netflix? Because I could binge you all day. 🎥",
        "Are you the ocean? Because I’m lost at sea thinking about you. 🌊",
        "Do you believe in fate? Because I think we were meant to meet. 💘",
        "Are you a shooting star? Because you light up my world. 🌟"
      ];

      // Pick a random pickup line
      const randomIndex = Math.floor(Math.random() * pickupLines.length);
      const pickupLine = pickupLines[randomIndex];

      // Format the message
      const message = `💖 Hey ${mentionName}, ${pickupLine} 😏✨`;

      // Send the pickup line with mentions
      api.sendMessage({
        body: message,
        mentions: [
          {
            tag: mentionName,
            id: mentionID,
            fromIndex: message.indexOf(mentionName),
            toIndex: message.indexOf(mentionName) + mentionName.length
          }
        ]
      }, event.threadID, event.messageID);

      console.log(`Sent pickup line to ${mentionName} in thread ${event.threadID}`);
    } catch (error) {
      console.error(`Failed to send pickup line: ${error.message}`);
      api.sendMessage('❌ Oops! Something went wrong while trying to send the pickup line. Please try again later. 🙏', event.threadID, event.messageID);
    }
  }
};
