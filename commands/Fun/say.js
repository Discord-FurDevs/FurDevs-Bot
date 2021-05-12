const { MessageEmbed } = require("discord.js")
const { checkBotOwner } = require("./../../utils/permissions")

exports.run = async (client, message, args) => {
    await message.delete();
    await checkBotOwner(message)
    message.channel.send(args.slice(0).join(" "))
};

exports.help = {
    name: "say",
    description: "Say something! **( Devs Only )**.",
    usage: "<message>",
    aliases: ["meow"],
    devOnly: true
};