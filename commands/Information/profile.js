const { MessageEmbed } = require("discord.js")
const moment = require('moment')

// TODO: Joined the Server
// TODO: Badges
// TODO: Reputation
// TODO: Level
// TODO: XP
// TODO: Membership Type ( Regular, Member, Staff )
// TODO: Add XP Bar


exports.run = async (client, message) => {
    await message.delete();
    const profile = await message.member.settings()
    const profileCard = new MessageEmbed()
    .setTitle(`Profile Card - ${message.author.username}`)
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .addField("Joined Server Date", `${moment(message.member.joinedAt).format("LLLL")}`)
    .addField("Reputation", `${profile.reps}`)
    .addField("XP", `${profile.XP}`)
    .addField("Level", `${profile.level}`)
    .setColor("#8800FF")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic:true})}`)
    .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(profileCard)
};

exports.help = {
    name: "profile",
    description: "Get a user's profile card for the guild.",
    usage: "[ User ]",
    aliases: ["pf"],
};