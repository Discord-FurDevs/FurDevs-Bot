const Discord = require("discord.js")
const {
    checkBotOwner
} = require("../../utils/permissions")
const GuildConfig = require("../../database/models/GuildConfig")
const {
    channelResolver
} = require("./../../utils/resolvers/channel")

exports.run = async (client, message, args) => {
    // Delete the original command message
    message.delete();
    await checkBotOwner(message);

    if (args[0]) {
        var GuildSettings = await message.guild.settings()
        var channel = await channelResolver(client, args[0])
        // Update the channel in the database
        await GuildConfig.updateOne({
            guildID: message.guild.id
        }, {
            verificationLogging: channel.id
        });

        // Return message
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({dynamic: true})}`
            )
            .setTitle(`Verification - The Logging Channel is Updated!`)
            .setDescription(`The Logging Channel is now ${channel}`)
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`#8800FF`);
        return message.channel.send(embed);
    }
    if (!channel) {
        var GuildSettings = await message.guild.settings()
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({dynamic: true})}`
            )
            .setTitle(`Verification - Current Channel!`)
            .setDescription(`The Current Channel set for this Verification is ${GuildSettings.verificationLogging ? "<#" + GuildSettings.verificationLogging + ">" : "Not Set!"} \n\nIf you wish to change that role you can do \n\`${GuildSettings.prefix}setVerificationChannel < Mention Channel >\``)
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`#8800FF`)
        return message.channel.send(embed);
    }
}
exports.help = {
    name: "setverificationchannel",
    description: "Change the verification logs channel.",
    usage: "[ Channel Mention ]",
    aliases: ["verifychannel"],
}