const axios = require("axios");

// Function to get the base API URL
const baseApiUrl = async () => {
  const base = await axios.get(
    'https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json'
  );
  return base.data.api;
};

// Prayer command configuration
module.exports.config = {
  name: "namaj",
  aliases: ["prayer"],
  version: "1.0",
  credits: "Anas", // Changed author name to Anas
  usePrefix: true,
  cooldowns: 5,
  role: 0,
  description: "View Prayer time",
  category: "𝗜𝗦𝗟𝗔𝗠",
  usages: "{pn} <city name>",
};

// Main function for the command
module.exports.onStart = async function ({ args }) {
  try {
    // Check if the city name is provided
    if (args.length === 0) {
      console.log("Please provide a city name to get prayer times.");
      return;
    }

    // Get the city name and build the API URL
    const cityName = args.join(" ");
    const apiUrl = `${await baseApiUrl()}/namaj?cityName=${encodeURIComponent(cityName)}&country=Bangladesh`;

    // Fetch the prayer times
    const response = await axios.get(apiUrl);
    const { fajr, sunrise, dhuhr, asr, maghrib, isha } = response.data.prayerTimes;

    // Format and display the prayer times
    const prayerTimes = `
🕋🌙 𝙿𝚛𝚊𝚢𝚎𝚛 𝚝𝚒𝚖𝚎𝚜 🕋🌙
🏙️ 𝙲𝚒𝚝𝚢 𝙽𝚊𝚖𝚎: ${cityName}

🕌 𝙵𝚊𝚓𝚛: ${fajr}
🕌 𝚂𝚞𝚗𝚛𝚒𝚜𝚎: ${sunrise}
🕌 𝙳𝚑𝚞𝚛: ${dhuhr}

🕌 𝙰𝚜𝚛: ${asr}
🕌 𝙼𝚊𝚐𝚑𝚛𝚒𝚋: ${maghrib}
🕌 𝙸𝚜𝚑𝚊: ${isha}
`;

    console.log(prayerTimes); // Log the result to the console
  } catch (e) {
    // Handle errors
    console.error(`Error: ${e.message}`);
  }
};