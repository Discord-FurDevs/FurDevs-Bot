const {
    MessageEmbed
} = require("discord.js")
const {
    usernameResolver
} = require("./../../utils/resolvers/username")
const {
    checkPermission
} = require("./../../utils/permissions")
const GuildConfig = require('./../../database/models/GuildConfig')

exports.run = async (client, message, args) => {
    // Delete the original command message
    message.delete();
    // Checks if the Staff is an Administrator
    checkPermission(message, "ADMINISTRATOR")
    // Get the guild Data
    const guildSettings = await message.guild.settings()
    if (args[0]) {
        const member = await usernameResolver(message, args[0])
        const staffTeam = await guildSettings.staffMembers
        if(!staffTeam.includes(member.id)) throw new Error("The Member is not in the database.")
        const index = await staffTeam.indexOf(member.id)
        staffTeam.splice(index, 1)
        await GuildConfig.updateOne({
            guildID: message.guild.id
        }, {
            staffMembers: staffTeam
        })
        .then(() => {
            const embed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic:true })}`
              )
              .setTitle(`Staff - Staff Member Removed!`)
              .setDescription(`The Staff Member has been removed to the Database! ${member} is now no longer able to do Staff Commands with the bot.`)
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
              .setTitle(`Staff - An Error Ocurred!`)
              .setDescription(`There was a problem removing the staff member into the database\n\n${err}`)
              .setTimestamp()
              .setFooter(`User ID: ${message.author.id}`)
              .setColor(`RED`);
            return message.channel.send(embed);
        })
        
    } else {
        throw new Error(`You need to specify an Staff Member\n\n\`${guildSettings.prefix}addStaff < Username | ID | Mention >\``)
    }



};


exports.help = {
    name: "removestaff",
    description: "Remove staff members into the the database.",
    usage: "< Username | ID | Mention >",
    aliases: [],
};