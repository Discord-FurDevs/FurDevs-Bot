const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

exports.run = async (client, message) => {
    await message.delete();
    const { url } = await fetch("https://random-d.uk/api/v2/random").then((response) => response.json());
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("🦆 Quack Quack!")
        .setImage(url)
        .setColor("#c6ff00")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
};

exports.help = {
    name: "duck",
    description: "Get an random image of a Duck!.",
    usage: "",
    aliases: ["quack"],
};