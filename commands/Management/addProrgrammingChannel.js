const { MessageEmbed } = require("discord.js")
const { channelResolver } = require("./../../utils/resolvers/channel")
const {
    checkPermission
} = require("./../../utils/permissions")
const GuildConfig = require('./../../database/models/GuildConfig')

exports.run = async (client, message, args) => {
    // Delete the original command message
    message.delete();
    // Checks if the Staff is an Administrator
    checkPermission(message, "ADMINISTRATOR")
    let guildSettings = await message.guild.settings()
    if (args[0]) {
        const channel = await channelResolver(client, args[0])
        const programmingChannels = await guildSettings.programmingChannels
        console.log(guildSettings)
        if(programmingChannels.includes(channel.id)) throw new Error("That channel is already added!")
        programmingChannels.push(channel.id)
        await GuildConfig.updateOne({
            guildID: message.guild.id
        }, {
            programmingChannels: programmingChannels
        })
        .then(() => {
            const embed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic:true })}`
              )
              .setTitle(`Programming Channel - Programming Channel Added!`)
              .setDescription(`The Programming Channel has been added to the Database! ${channel.name} will now be a place where you can get reped.`)
              .setTimestamp()
              .setFooter(`User ID: ${message.author.id}`)
              .setColor(`#8800FF`);
            return message.channel.send(embed);
        })
        .catch((err) => {
            const embed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic:true })}`
              )
              .setTitle(`Programming Channel - An Error Ocurred!`)
              .setDescription(`There was a problem adding the Programming Channel into the database\n\n${err}`)
              .setTimestamp()
              .setFooter(`User ID: ${message.author.id}`)
              .setColor(`RED`);
            return message.channel.send(embed);
        })
        
    } else {
        throw new Error(`You need to specify an Programming Channel\n\n\`${guildSettings.prefix}addProgrammingChannel < ID | Mention >\``)    }


};


exports.help = {
    name: "addprogrammingchannel",
    description: "Add programming channels into the the database.",
    usage: "< Mention | Channel ID >",
    aliases: [],
};