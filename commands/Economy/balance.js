const { usernameResolver } = require("./../../utils/resolvers/username");
const { MessageEmbed } = require("discord.js");
const BotSettings = require("./../../settings.json");

exports.run = async (client, message, args) => {
  await message.delete();


  if(!args[0]) {
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`pockets of ${message.author.username}!`)
    .setDescription(`You currently have ${message.member.settings().coins} ${BotSettings.currency}`)
    .setColor(`#8800FF`);
    message.channel.send(embed);
  }else {
    const user = await usernameResolver(message, args[0]);
    const userAsMember = message.guild.members.cache.get(user.id);
    if(userAsMember) {
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`pockets of ${user.username}!`)
        .setDescription(`${user.username} currently has ${userAsMember.settings().coins} ${BotSettings.currency} in their pocket`)
        .setColor(`#8800FF`);
        message.channel.send(embed);
    }else {
        throw new Error("This user cannot be found in the guild!");
    }
  }
};

exports.help = {
  name: "balance",
  description: "See your own balance or from someone else",
  usage: "< username | ID | Mention >",
  aliases: ["bal", "money"],
};
