const fs = require("fs-extra");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
    config: {
        name: "art",
        version: "1.2", // Updated version number
        author: "Anas",
        countDown: 7,
        role: 0,
        shortDescription: "Art filter",
        longDescription: "Applies a fun art effect to your image locally without external APIs.",
        category: "box chat",
        guide: {
            en: "{pn} | reply to an image"
        }
    },

    onStart: async function ({ message, event }) {
        let imageUrlInput;

        // Validate the input image
        if (["photo", "sticker"].includes(event.messageReply?.attachments[0]?.type)) {
            imageUrlInput = event.messageReply.attachments[0].url;
        } else {
            return message.reply("⚠️ Please reply with an image to apply the art effect.");
        }

        try {
            // Load the input image
            const imageResponse = await axios.get(imageUrlInput, { responseType: "arraybuffer" });
            const inputImage = await loadImage(imageResponse.data);

            // Create a canvas and draw the input image
            const canvas = createCanvas(inputImage.width, inputImage.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(inputImage, 0, 0);

            // Apply an artistic effect (e.g., invert colors)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = 255 - imageData.data[i]; // Red
                imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Green
                imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Blue
            }
            ctx.putImageData(imageData, 0, 0);

            // Save the edited image locally
            const outputFilePath = "artEffect.png";
            const outputBuffer = canvas.toBuffer();
            await fs.writeFile(outputFilePath, outputBuffer);

            // Send the processed image
            await message.reply({
                body: "Art effect applied successfully! 🎨✨",
                attachment: fs.createReadStream(outputFilePath)
            });

            // Remove temporary image file
            await fs.remove(outputFilePath);
        } catch (error) {
            console.error("Error:", error);
            message.reply("❌ An error occurred while processing the image. Please try again later.");
        }
    }
};
