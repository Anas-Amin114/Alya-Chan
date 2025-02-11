const axios = require("axios");
const cheerio = require("cheerio");
const Canvas = require("canvas");
const fs = require("fs-extra");

const langsSupported = [
  'sq', 'ar', 'az', 'bn', 'bs', 'bg', 'my', 'zh-hans', 'zh-hant', 'hr', 'cs', 'da', 'nl', 'en', 'et', 'fil', 'fi', 'fr', 'ka', 'de', 'el', 'he', 'hi', 'hu', 'id', 'it', 'ja', 'kk', 'ko', 'lv', 'lt', 'ms', 'nb', 'fa', 'pl', 'pt', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'sv', 'th', 'tr', 'uk', 'vi'
];

module.exports = {
  config: {
    name: "emojimean",
    alias: ["em", "emojimeaning", "emojimean"],
    version: "1.3",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Tìm nghĩa của emoji",
      en: "Find the meaning of emoji"
    },
    longDescription: {
      vi: "Tìm nghĩa của emoji",
      en: "Find the meaning of emoji"
    },
    category: "wiki",
    guide: {
      vi: "   {pn} <emoji>: Tìm nghĩa của emoji",
      en: "   {pn} <emoji>: Find the meaning of emoji"
    }
  },

  langs: {
    vi: {
      missingEmoji: "⚠️ Bạn chưa nhập emoji",
      meaningOfEmoji: "📌 Nghĩa của emoji %1:\n\n📄 Nghĩa đầu tiên: %2\n\n📑 Nghĩa khác: %3%4\n\n📄 Shortcode: %5\n\n©️ Nguồn: %6\n\n📺 Dưới đây là hình ảnh hiện thị của emoji trên một số nền tảng:",
      meaningOfWikipedia: "\n\n📝 Reaction tin nhắn này để xem nghĩa \"%1\" từ Wikipedia",
      meanOfWikipedia: "📑 Nghĩa của \"%1\" trên Wikipedia:\n%2",
      manyRequest: "⚠️ Hiện tại bot đã gửi quá nhiều yêu cầu, vui lòng thử lại sau",
      notHave: "Không có"
    },
    en: {
      missingEmoji: "⚠️ You have not entered an emoji",
      meaningOfEmoji: "📌 Meaning of emoji %1:\n\n📄 First meaning: %2\n\n📑 More meaning: %3%4\n\n📄 Shortcode: %5\n\n©️ Source: %6\n\n📺 Below are images of the emoji displayed on some platforms:",
      meaningOfWikipedia: "\n\n📝 React to this message to see the meaning \"%1\" from Wikipedia",
      meanOfWikipedia: "📑 Meaning of \"%1\" on Wikipedia:\n%2",
      manyRequest: "⚠️ The bot has sent too many requests, please try again later",
      notHave: "Not have"
    }
  },

  onStart: async function ({ args, message, event, threadsData, getLang, commandName }) {
    const emoji = args[0];
    if (!emoji) return message.reply(getLang("missingEmoji"));

    const threadData = await threadsData.get(event.threadID);
    let myLang = threadData.data.lang || global.GoatBot.config.language;
    myLang = langsSupported.includes(myLang) ? myLang : "en";

    let getMeaning;
    try {
      getMeaning = await getEmojiMeaning(emoji, myLang);
    } catch (e) {
      if (e.response?.status === 429) {
        for (let i = 0; i < 3; i++) {
          try {
            getMeaning = await getEmojiMeaning(emoji, myLang);
            break;
          } catch {
            if (i === 2) return message.reply(getLang("manyRequest"));
          }
        }
      }
    }

    const { meaning, moreMeaning, wikiText, meaningOfWikipedia, shortcode, source } = getMeaning;
    let images = getMeaning.images;

    const canvasConfig = {
      sizeImage: 190,
      imageInRow: 5,
      paddingOfTable: 20,
      marginImageAndText: 10,
      marginImage: 20,
      marginText: 2,
      fontSize: 30,
      addWidthImage: 150
    };

    const font = `${canvasConfig.fontSize}px Arial`;
    const ctx = setupCanvasContext(canvasConfig);

    const buffer = await drawEmojiImages(images, canvasConfig, ctx, font);

    const pathSave = `${__dirname}/tmp/${Date.now()}.png`;
    fs.writeFileSync(pathSave, buffer);

    return message.reply(
      {
        body: getLang("meaningOfEmoji", emoji, meaning, moreMeaning, wikiText ? getLang("meaningOfWikipedia", wikiText) : "", shortcode || getLang("notHave"), source),
        attachment: fs.createReadStream(pathSave)
      },
      (err, info) => {
        fs.unlinkSync(pathSave);
        if (wikiText)
          global.GoatBot.onReaction.set(info.messageID, {
            commandName,
            author: event.senderID,
            messageID: info.messageID,
            emoji,
            meaningOfWikipedia
          });
      }
    );
  },

  onReaction: async ({ event, Reaction, message, getLang }) => {
    if (Reaction.author !== event.userID) return;
    return message.reply(getLang("meanOfWikipedia", Reaction.emoji, Reaction.meaningOfWikipedia));
  }
};

async function getEmojiMeaning(emoji, lang) {
  const url = `https://www.emojiall.com/${lang}/emoji/${encodeURIComponent(emoji)}`;
  const urlImages = `https://www.emojiall.com/${lang}/image/${encodeURIComponent(emoji)}`;

  const { data } = await axios.get(url);
  const { data: dataImages } = await axios.get(urlImages);

  const $ = cheerio.load(data);

  const meaning = $(".emoji_card_list.pages > div.emoji_card_content.px-4.py-3").eq(0).text().trim();
  const moreMeaning = $(".emoji_card_list.pages > div.emoji_card_content.px-4.py-3").eq(1).text().trim();
  const wikiText = $(".emoji_card_list.pages > .emoji_card_list.border_top > .emoji_card_content.pointer").text().trim().split(":").find(item => item.includes(emoji))?.trim();
  const meaningOfWikipedia = $(".emoji_card_list.border_top > div.emoji_card_content.border_top.small > div.category_all_list").text().trim();
  const shortcode = $("table.table.table-hover.top_no_border tr:has(sup > a[href*='help-shortcode'])").text().match(/(:.*:)/)?.[1];

  const images = [];
  $(".emoji_card_list.pages > .emoji_card_content.px-4.py-3 > ul.emoji_imgs.row.row-cols-2.row-cols-lg-4.mb-0 li")
    .slice(1, -1)
    .each((_, el) => {
      const $el = $(el);
      const platform = $el.find("figure > p[class='capitalize'] > span[class='emoji_font line'] + a[class='text_blue']").text().trim();
      let url = $el.find("figure > img").attr("data-src") || $el.find("div > a").attr("href");
      images.push({
        url,
        platform: platform.toLowerCase() === "táo" ? "Apple" : platform
      });
    });

  return { meaning, moreMeaning, wikiText, meaningOfWikipedia, shortcode, images, source: url };
}

function setupCanvasContext(config) {
  const canvas = Canvas.createCanvas(0, 0);
  const ctx = canvas.getContext("2d");
  ctx.font = `${config.fontSize}px Arial`;
  return ctx;
}

async function drawEmojiImages(images, config, ctx, font) {
  const canvas = Canvas.createCanvas(0, 0);
  ctx = canvas.getContext("2d");

  const widthOfOneImage = config.sizeImage + config.marginImage * 2 + config.addWidthImage;
  const maxRowText = Math.max(...images.map(item => wrapped(item.platform, widthOfOneImage, font, ctx).length));
  const heightForText = maxRowText * config.fontSize + config.marginText * 2 + config.fontSize;

  const heightOfOneImage = config.sizeImage + config.marginImageAndText + heightForText + config.marginImage + config.marginText;

  const witdhTable = config.paddingOfTable * 2 + config.imageInRow * widthOfOneImage;
  const heightTable = config.paddingOfTable * 2 + Math.ceil(images.length / config.imageInRow) * heightOfOneImage;

  const finalCanvas = Canvas.createCanvas(witdhTable, heightTable);
  const finalCtx = finalCanvas.getContext("2d");
  finalCtx.fillStyle = "#303342";
  finalCtx.fillRect(0, 0, witdhTable, heightTable);

  let xStart = config.paddingOfTable + config.marginImage;
  let yStart = config.paddingOfTable + config.marginImage;

  for (const item of images) {
    const img = await Canvas.loadImage(`https://www.emojiall.com/${item.url}`);
    finalCtx.fillStyle = "#2c2f3b";
    drawSquareRounded(finalCtx, xStart - config.marginImage, yStart - config.marginImage, widthOfOneImage, heightOfOneImage, 30);

    finalCtx.drawImage(img, xStart + config.addWidthImage / 2, yStart, config.sizeImage, config.sizeImage);

    const texts = wrapped(item.platform, widthOfOneImage, font, finalCtx);
    finalCtx.fillStyle = "white";
    texts.forEach((text, index) => {
      finalCtx.fillText(text, xStart + config.sizeImage / 2 + config.addWidthImage / 2, yStart + config.sizeImage + config.marginImageAndText + (index + 1) * config.fontSize);
    });

    xStart += widthOfOneImage;
    if (xStart >= witdhTable - config.paddingOfTable) {
      xStart = config.paddingOfTable + config.marginImage;
      yStart += heightOfOneImage;
    }
  }

  return finalCanvas.toBuffer("image/png");
}

function drawSquareRounded(ctx, x, y, w, h, r) {
  ctx.save();
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function wrapped(text, maxWidth, font, ctx) {
  ctx.font = font;
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const testLine = `${line}${word} `;
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && line) {
      lines.push(line);
      line = `${word} `;
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);
  return lines;
}