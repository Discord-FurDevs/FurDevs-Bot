const { MessageEmbed } = require("discord.js")
const { checkBotOwner } = require("../../utils/permissions")
const { reload } = require("../../utils/utils")
const { readdirSync } = require("fs")


exports.run = async (client, message) => {
    await message.delete();
    await checkBotOwner(message)
    const cmdFiles = await readdirSync("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    await cmdFiles.forEach(cmd => {
        if (!cmd.endsWith(".js")) return;
        const response = reload(client, cmd);
        if (response) console.log(response);
    });
    message.reply("The Bot Is reloaded :+1:")
};

exports.help = {
    name: "reload",
    description: "Reload the bot.",
    usage: "",
    aliases: ["rl"],
};