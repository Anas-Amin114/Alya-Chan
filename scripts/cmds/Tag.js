const config = {
    name: "tag",
    version: "1.6.9",
    author: "Dipto",
    credits: "Dipto",
    countDown: 0,
    role: 0,
    hasPermission: 0,
    description: "Tag user",
    category: "tag",
    commandCategory: "tag",
    guide: "{pn} [reply/mention]",
    usages: "reply or mention"
};

const onStart = async ({ api, args, event }) => {
    try {
        // Get the ID of the mentioned user (either from the reply or args)
        const ID = event.messageReply?.senderID || args[0] || event.senderID;

        // Fetch user information
        const mentionedUser = await api.getUserInfo(ID);

        if (mentionedUser && mentionedUser[ID]) {
            const userName = mentionedUser[ID].name;
            const text = args.slice(1).join(" ");  // Join the rest of the args for the message part

            // Send the message with mention
            await api.sendMessage({
                body: `${userName} ${text}`,
                mentions: [{
                    tag: userName,
                    id: ID 
                }]
            }, event.threadID, event.messageID);
        } else {
            // If no reply or mention, ask user to reply
            api.sendMessage("Please reply to a message or mention a user to tag...", event.threadID, event.messageID);
        }
    } catch (error) {
        console.log(error);
        // Log the error message
        api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
    }
};

module.exports = {
    config, 
    onStart,
    run: onStart
};
