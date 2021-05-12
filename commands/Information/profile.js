const {
    MessageEmbed
} = require("discord.js")
const moment = require('moment')
const { usernameResolver } = require('./../../utils/resolvers/username')

// TODO: Joined the Server
// TODO: Badges
// TODO: Reputation
// TODO: Level
// TODO: XP
// TODO: Membership Type ( Regular, Member, Staff )
// TODO: Add XP Bar


exports.run = async (client, message, args) => {
    await message.delete();
    if (!args[0]) {
        const profile = await message.member.settings()
        const profileCard = new MessageEmbed()
            .setTitle(`Profile Card - ${message.author.username}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .addField("Joined Server Date", `${moment(message.member.joinedAt).format("LLLL")}`)
            .addField("Reputation", `${profile.reps}`)
            .addField("XP", `${profile.XP}`)
            .addField("Level", `${profile.level}`)
            .addField("Coins", `${profile.coins}`)
            .setColor("#8800FF")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic:true})}`)
            .setFooter(`User ID: ${message.author.id}`)
        message.channel.send(profileCard)
    } else {
        let user = await usernameResolver(message, args[0])
        let target = await message.guild.members.cache.get(user.id)
        const profile = await target.settings()
        const profileCard = new MessageEmbed()
            .setTitle(`Profile Card - ${user.username}`)
            .setAuthor(`${user.tag}`, `${user.displayAvatarURL({ dynamic: true })}`)
            .addField("Joined Server Date", `${moment(target.joinedAt).format("LLLL")}`)
            .addField("Reputation", `${profile.reps}`)
            .addField("XP", `${profile.XP}`)
            .addField("Level", `${profile.level}`)
            .addField("Coins", `${profile.coins}`)
            .setColor("#8800FF")
            .setThumbnail(`${user.displayAvatarURL({dynamic:true})}`)
            .setFooter(`Executor's ID: ${message.author.id}`)
        message.channel.send(profileCard)
    }
};

exports.help = {
    name: "profile",
    description: "Get a user's profile card for the guild.",
    usage: "[ User ]",
    aliases: ["pf"],
};