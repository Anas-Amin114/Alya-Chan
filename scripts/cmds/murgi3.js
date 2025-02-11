module.exports = {
  config: {
    name: "murgi3",
    aliases: ["baby"],
    version: "1.0",
    author: "Anas",
    role: 0,
    category: "fun",
    shortDescription: "Flirt With Lines",
    longDescription: "",
    guide: {
      vi: "Not Available",
      en: "{p} chik"
    }
  },

  onStart: async function ({ api, event, userData, args }) {
    const allowedUID = "100084690500330"; // Specific UID allowed to use this command
    const senderUID = event.senderID;

    if (senderUID !== allowedUID) {
      return api.sendMessage("Hey Kid Are U Mad ?? .", event.threadID);
    }

    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("PLZ Tag a person i Will Fuck him soon.", event.threadID);

    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });

    var roastedLines = [
      "You're so unique, even your Wi-Fi drops you.",
      "You're like a cloud... when you disappear, it's a beautiful day.",
      "Your secrets are always safe with me. I never even listen when you tell me them.",
      "You bring everyone so much joy when you leave the room.",
      "I'd agree with you, but then we'd both be wrong.",
      "You're proof that even the internet can fail sometimes.",
      "You have the perfect face for radio.",
      "You’ve got the perfect body for a horror movie.",
      "You are like a cloud. When you disappear, it's a beautiful day.",
      "Your brain is like a web browser. Too many tabs open, but none of them are useful.",
      "You're not stupid; you just have bad luck thinking.",
      "You're like a software update. Whenever I see you, I think, ‘Not now.’",
      "You're like a vending machine... never working when you’re needed.",
      "I’d explain it to you, but I left my English-to-Dingbat dictionary at home.",
      "You are proof that even bad decisions can be fun.",
      "You're like a phone with no signal—completely useless!",
      "You could be the reason why the GPS says 'Recalculating.'",
      "You're the reason the warning label on the hairdryer exists.",
      "You're like a broken pencil—pointless.",
      "You couldn’t pour water out of a boot if the instructions were on the heel.",
      "Your brain is like a storage unit—full but disorganized.",
      "You're the human equivalent of a participation trophy.",
      "You’re like a cloud. The longer you stay, the harder it rains.",
      "Your idea of multitasking is eating and watching TV at the same time.",
      "You’re proof that evolution can go in reverse.",
      "If your brain was dynamite, there wouldn’t be enough to blow your hat off.",
      "If ignorance is bliss, you must be the happiest person alive.",
      "You have the perfect face for a wanted poster.",
      "You must be the human version of a typo.",
      "If I had a dollar for every time you said something smart, I’d be broke.",
      "You're like an app that takes forever to load — annoying and pointless.",
      "You're like the appendix—nobody really knows what you do, but we’d be fine without you.",
      "You're a few fries short of a Happy Meal.",
      "You're the reason we have instructions on shampoo bottles.",
      "You’re like a smartphone without Wi-Fi – useless.",
      "You're the human embodiment of a 404 error.",
      "You’re like a broken pencil: no point.",
      "You’ve got a face for radio and a voice for silent movies.",
      "If laziness was an Olympic sport, you'd have a gold medal.",
      "You have the charm of a damp rag.",
      "You're like a lightbulb in a blackout – completely useless.",
      "You're the human equivalent of a traffic jam.",
      "You're a few fries short of a happy meal.",
      "You're as bright as a 3-watt bulb.",
      "If you were any more laid back, you'd be horizontal.",
      "You couldn’t organize a one-car parade.",
      "You're like a phone with no service – nobody can hear you.",
      "Your brain is like a playground – mostly empty with a few swings that don't work.",
      "You must be the reason for the warning sign on the microwave.",
      "You're the only person I know who can trip over a wireless connection.",
      "Your brain is so empty, even the vacuum cleaner refuses to go near it.",
      "You're not the sharpest tool in the shed, but you're definitely the most colorful.",
      "You're like an air conditioner — always there, but you do nothing when needed.",
      "If I had a penny for every time you said something intelligent, I’d still be poor.",
      "You're like a rubber band – stretched too thin and ready to snap.",
      "You’re like the ‘Skip Intro’ button—quickly forgotten.",
      "If I wanted to hear from an idiot, I’d have just talked to myself."
    ];

    var allRoasts = [];
    for (let i = 0; i < 100000; i++) {
      // Repeating roasted lines enough times to reach 100,000 messages
      allRoasts.push(roastedLines[i % roastedLines.length] + ` (${i + 1})`);
    }

    // Sending 100,000 messages with a 3-second delay between each batch
    const batchSize = 100; // Number of messages to send in each batch
    let currentIndex = 0;

    const sendBatch = () => {
      const endIndex = Math.min(currentIndex + batchSize, allRoasts.length);
      const batch = allRoasts.slice(currentIndex, endIndex);

      batch.forEach((message, index) => {
        setTimeout(() => {
          api.sendMessage({
            body: message + " " + name,
            mentions: arraytag
          }, event.threadID);
        }, index * 3000); // 3-second delay between each message in the batch
      });

      currentIndex = endIndex;

      // If there are more messages to send, continue sending in batches
      if (currentIndex < allRoasts.length) {
        setTimeout(sendBatch, 5000); // 5-second delay between batches
      }
    };

    // Start sending batches
    sendBatch();
  }
};