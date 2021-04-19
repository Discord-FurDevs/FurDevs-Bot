const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

exports.run = async (client, message) => {
    await message.delete();
    const { file } = await fetch("https://aws.random.cat/meow").then((response) => response.json());
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("🐱 Meow *purr*!")
        .setImage(file)
        .setColor("#000")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
};

exports.help = {
    name: "cat",
    description: "Get an random image of a Cat!.",
    usage: "",
    aliases: ["meow"],
};