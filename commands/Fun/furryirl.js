const { MessageEmbed } = require("discord.js")
const randomPuppy = require(`random-puppy`)

exports.run = async (client, message) => {
    await message.delete();
    const subReddits = [`furry_irl`, `furry`];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]
    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("Furries are Awesome UwU!")
        .setImage(img)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
};

exports.help = {
    name: "furryirl",
    description: "Get a random image from the furry subreddit, could be a meme or maybe not.",
    aliases: ["furry"],
};