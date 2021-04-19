const {
    checkBotPermission
} = require("../../utils/permissions");
const {
    userResolver
} = require("../../utils/resolvers/user");
const {
    send
} = require("../../utils/guild");
const {
    MessageEmbed
} = require('discord.js')

exports.run = async (client, message, args) => {
    await message.delete();
    const settings = await message.guild.settings();
    if (!settings.staffMembers.includes(message.author.id) && message.member.hasPermission("BAN_MEMBERS")) throw new Error("Hey! You're Not suppose to do that!\n\nThis Incident will be reported.")
    if (!args[0]) throw new Error("Please provide an Mention or User's ID of the User you would like to ban");
    let vUser = await userResolver(client, args[0]);
    if (message.author === vUser) throw new Error("Why would you want to ban yourself!? You don't want to be a Lost\n\nhttps://media.discordapp.net/attachments/731523552636829697/780527734542696468/unknown-5.png")
    await checkBotPermission(message, "BAN_MEMBERS");
    if (!args[1]) throw new Error("A Reason is required in order to ban this member")
    let reason = `${args.slice(1).join(" ")}`
    const banned = await message.guild.fetchBan(vUser).catch(() => {})
    if (banned) throw new Error("The User is already banned!")


    let member = message.guild.members.cache.get(vUser.id)
    if (member) {
        if (!message.member.roles.highest.comparePositionTo(member.roles.highest) > 0) throw new Error("You can ban a user above you")
    }

    await message.guild.members.ban(vUser.id, {
        reason: `Responsible ${message.author.username} | ${reason}`,
    }).catch(err => {
        throw new Error(`Cannot ban this user\n\n\n${err}`)
    })
    const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Ban Command`)
        .setDescription(`Banned ${vUser.username} from ${message.guild.name} by ${message.author.username}\n\nReason: \`${reason}\``)
        .setThumbnail("https://media.discordapp.net/attachments/778333835967594520/791462504487452722/ban.gif")
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
        .setColor(`#8800FF`);
    message.channel.send({
        embed,
    });
    const public = new MessageEmbed()
        .setTitle("Public Mod Logs")
        .setColor("#8800FF")
        .setDescription(`**${vUser.username}** has been Kicked from ${message.guild.name}`)
        .addField('User', `${vUser.username}(${vUser.id})`)
        .addField('Responsible Staff Member', `${message.author}(${message.author.id})`)
        .addField("Reason", `${reason}`)
        .setTimestamp()
    await send("publicModLogs", message.guild, public)
};

exports.help = {
    name: "ban",
    description: "Ban a Member from the Server!",
    usage: "< Username > < Reason >",
    aliases: ["banish"],
};