const { usernameResolver } = require("./../../utils/resolvers/username");
const { MessageEmbed } = require("discord.js");
const BotSettings = require("./../../settings.json");

exports.run = async (client, message, args) => {
  await message.delete();


  if(!args[0]) {
      const settings = await message.member.settings()
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${message.author.username}'s Pockets!`)
    .setDescription(`You currently have ${settings.coins} ${BotSettings.currency}`)
    .setColor(`#8800FF`);
    message.channel.send(embed);
  }else {
    const user = await usernameResolver(message, args[0]);
    const userAsMember = message.guild.members.cache.get(user.id);
    if(userAsMember) {
        let settings = await userAsMember.settings()
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`${user.username}'s Pockets!`)
        .setDescription(`${user.username} currently has ${settings.coins} ${BotSettings.currency} in their pocket`)
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
