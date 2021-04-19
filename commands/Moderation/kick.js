const {
    checkBotPermission
} = require("../../utils/permissions");
const {
    memberResolver
} = require("../../utils/resolvers/member");
const {
    send
} = require("../../utils/guild");
const {
    MessageEmbed
} = require('discord.js')

exports.run = async (client, message, args) => {
    await message.delete();
    const settings = await message.guild.settings();
    if (!settings.staffMembers.includes(message.author.id) && message.member.hasPermission("KICK_MEMBERS")) throw new Error("Hey! You're Not suppose to do that!\n\nThis Incident will be reported.")
    if (!args[0]) throw new Error("Please provide an Mention or User's ID of the User you would like to kick");
    let vMember = await memberResolver(message, args[0]);
    if (message.member === vMember) throw new Error("Why would you want to kick yourself!? You don't want to be a Lost\n\nhttps://media.discordapp.net/attachments/731523552636829697/780527734542696468/unknown-5.png")
    await checkBotPermission(message, "KICK_MEMBERS");
    if (!args[1]) throw new Error("A Reason is required in order to kick this member")
    let reason = `${args.slice(1).join(" ")}`
    if (!message.member.roles.highest.comparePositionTo(vMember.roles.highest) > 0) throw new Error("You can kick a user above you")
    await vMember.kick({
        reason: `Responsible ${message.author.username} | ${reason}`,
    }).catch(err => {
        throw new Error(`Cannot kick this user\n\n\n${err}`)
    })
    const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Kick Command`)
        .setDescription(`Kicked ${vMember.user.username} from ${message.guild.name} by ${message.author.username}\n\nReason: \`${reason}\``)
        .setThumbnail("https://media.discordapp.net/attachments/778333835967594520/791462504487452722/ban.gif")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
        .setColor(`#8800FF`);
    message.channel.send({
        embed,
    });
    const public = new MessageEmbed()
        .setDescription(`**${vMember.user.username}** has been Kicked from ${message.guild.name}`)
        .addField('User', `${vMember.user.username}(${vMember.user.id})`)
        .addField('Responsible Staff Member', `${message.author}(${message.author.id})`)
        .addField("Reason", `${reason}`)
        .setColor("#8800FF")
        .setTimestamp()
    await send("publicModLogs", message.guild, public)
};

exports.help = {
    name: "kick",
    description: "Kick a Member from the Server!",
    usage: "< Username > < Reason >",
    aliases: [],
};