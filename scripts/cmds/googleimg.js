const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  config: {
    name: "googleimg",
    author: "luffy",
    version: "2.1",
    shortDescription: "Search for images using Google Images",
    longDescription: "Search for images using Google Images and return a specified number of results quickly.",
    category: "utility",
    guide: {
      en: "{prefix}{name} [number of images] [search query]"
    }
  },

  onStart: async function({ args, message }) {
    try {
      if (args.length < 2) {
        return message.reply("Please specify the number of images and a search query.");
      }

      const numResults = parseInt(args.shift());
      if (isNaN(numResults) || numResults <= 0) {
        return message.reply("The first argument must be a valid number of images to retrieve.");
      }

      const query = args.join(' ');
      const encodedQuery = encodeURIComponent(query);
      const url = `https://www.google.com/search?q=${encodedQuery}&tbm=isch`;

      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const $ = cheerio.load(data);
      const results = [];
      $('img[src^="https://"]').each(function() {
        results.push($(this).attr('src'));
      });

      if (results.length === 0) {
        return message.reply("No images found for the given query.");
      }

      const attachments = results.slice(0, numResults);

      return message.reply({
        body: `Here are the top ${attachments.length} image results for "${query}":`,
        attachment: attachments
      });
    } catch (error) {
      console.error(error);
      return message.reply("Sorry, an error occurred while fetching images.");
    }
  }
};