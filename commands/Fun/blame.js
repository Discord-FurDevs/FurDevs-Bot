const { MessageEmbed } = require("discord.js")
const { checkBotOwner } = require("./../../utils/permissions")

exports.run = async (client, message, args) => {
    await message.delete();
    await checkBotOwner(message)
    for(var i = 0; i< 5; i++){
    message.channel.send(args.slice(0).join(" "))
    }
};

exports.help = {
    name: "blame",
    description: "Say something! **( Devs Only )**.",
    usage: "<message>",
    aliases: [],
    devOnly: true
};