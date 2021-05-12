const { MessageEmbed } = require("discord.js")


exports.run = async (client, message) => {
    await message.delete();
    const msg = await message.channel.send("Flying...");
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("🏓 Pong!")
        .addField("ws/API Latency", `${Math.round(client.ws.ping)}ms`)
        .addField("Message Latency is", `${msg.createdTimestamp - message.createdTimestamp}ms`)
        .setColor("#8800FF")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    msg.delete()
    message.channel.send(embed)
};

exports.help = {
    name: "ping",
    description: "Get the bot's Latency.",
    usage: "ping",
    aliases: [],
};