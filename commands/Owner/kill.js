const { checkBotOwner } = require("./../../utils/permissions")

exports.run = async (client, message, args) => {
    await message.delete()
    await checkBotOwner(message)
        
    // Exit the process
    await message.channel.send(`The bot will commit death`);
    process.exit();
};

exports.help = {
    name: "kill",
    description: "Kill the bot's process",
    usage: "kill",
    aliases: ["kill"],
};