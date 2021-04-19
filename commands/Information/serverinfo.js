const { MessageEmbed } = require("discord.js")
const moment = require("moment")


exports.run = async (client, message, args) => {
    await message.delete()
    
    let serverEmbed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic: true })}`
            )
            .setTitle(`🧐  Server Information - ${message.guild.name}`)
            .addField(`Server Name:`, `${message.guild.name}`, true)   
            .addField(`Server ID:`, `${message.guild.id}`, true)   
            .addField(`Server Owner:`, `${message.guild.owner}`)   
            .addField(`Online Members:`, `${message.guild.members.cache.filter(member => member.presence.status !== "offline").size} members`, true)   
            .addField(`Offline Members:`, `${message.guild.members.cache.filter(member => member.presence.status === "offline").size} members`, true)   
            .addField(`Total Members:`, `${message.guild.members.cache.size} members`, true)   
            .addField(`Total Roles Count`, `${message.guild.roles.cache.size} Roles`)
            .addField(`Total Channel Count`, `${message.guild.channels.cache.size} Channels`)
            .addField(`Total Emoji Count`, `${message.guild.emojis.cache.size} Emojis`, true)
            .addField(`Total Booster Count`, `${message.guild.premiumSubscriptionCount ? `${message.guild.premiumSubscriptionCount} boosts` : "No Boosters :C"}`)
            .addField(`Created:`, `${moment(message.guild.createdTimestamp).format('LLLL')} ( ${moment(message.guild.createdTimestamp).fromNow()} )`)   
            .setTimestamp()
            .setColor("#8800FF")
            .setFooter(
                `Requester ID: ${message.author.id}`
            );
            serverEmbed.setTimestamp(message.guild.iconURL({ dynamic: true }))
        return message.channel.send(serverEmbed);
    };

exports.help = {
    name: "serverinfo",
    description: "Displays information the server it is being executed in.",
    usage: "",
    aliases: ["server", "guildinfo", "guild"],
};

