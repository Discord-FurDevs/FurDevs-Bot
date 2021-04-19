const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

exports.run = async (client, message) => {
    await message.delete();
    const { slip } = await fetch("https://api.adviceslip.com/advice").then((response) => response.json());
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("📖 An Advice!")
        .setDescription(slip.advice)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
};

exports.help = {
    name: "advice",
    description: "Get an advice from the bot.",
    usage: "",
    aliases: [],
};