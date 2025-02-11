module.exports = {
  config: {
    name: "calculate",
    version: "1.1",
    author: "OtinXSandip",
    role: 0,
    colldown: 5,
    shortDescription: "Perform basic arithmetic calculations with style! 🧮",
    category: "utility",
    guide: "{prefix}calculate <expression> - Example: {prefix}calculate 2 + 2 * (3 / 4)",
  },

  onStart: async function ({ message, args }) {
    const expression = args.join(" ");

    if (!expression) {
      return message.reply("❌ Please provide an expression to calculate! Example: `2 + 2`");
    }

    // Validate for unsafe or invalid characters
    const safeExpression = expression.replace(/[^0-9+\-*/(). ]/g, "");
    if (safeExpression !== expression) {
      return message.reply("⚠️ Invalid characters detected in the expression! Please use only numbers and basic operators (+, -, *, /, ()).");
    }

    let result;
    try {
      // Calculate the result
      result = eval(safeExpression);

      // Validate that the result is a number
      if (isNaN(result)) {
        throw new Error("Invalid calculation result.");
      }
    } catch (error) {
      console.error(error);
      return message.reply("🚨 Oops! Something went wrong while calculating your expression. Ensure it's valid and try again.");
    }

    // Send a fancy reply with emojis
    return message.reply(`🎉 The result of your expression \`${expression}\` is: **${result}** 🧮`);
  },
};
