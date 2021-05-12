const { MessageEmbed } = require("discord.js")
const randomPuppy = require(`random-puppy`)

exports.run = async (client, message) => {
    await message.delete();
    const subReddits = [`dankmeme`, `meme`, `me_irl`];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]
    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("Meme to Light up your day!")
        .setImage(img)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
};

exports.help = {
    name: "meme",
    description: "Get memes to cheer up your day.",
    aliases: [],
};