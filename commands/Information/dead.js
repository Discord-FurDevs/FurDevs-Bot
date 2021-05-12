const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    await message.delete()
    const embed = new MessageEmbed()
        .setTitle("Chat!")
        .setDescription("Always pointing out that a chat is dead doesn't get you a reward or anything. In fact it doesn't help the server in any way. So instead of saying how inactive a channel is, try to get things moving again! Anything is better than complaining about it :3")
    .setColor("#8800FF")
        .setFooter("Credits to https://dead-ch.at/")
    await message.channel.send(embed)
};

exports.help = {
    name: "dead",
    description: "Thus server us ded;",
    usage: "dead",
    aliases: ["ask", "data"],
};