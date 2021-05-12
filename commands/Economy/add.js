const { usernameResolver } = require("./../../utils/resolvers/username");
const { MessageEmbed } = require("discord.js");
const BotSettings = require("./../../settings.json");

exports.run = async (client, message, args) => {
  await message.delete();
  if(!message.member.roles.cache.has(message.guild.settings().bankerRole)) throw new Error("You need to have a Banker Role, to be able to execute this command!");
  if(!args[0]) throw new Error("Please specify a user by providing the name, mention, or userID of that user ");
  if(!args[1] || isNaN(args[1])) throw new Error("Please specify an amount!");
  const user = await usernameResolver(message, args[0]);
  if(message.member.add(args[1])) {
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`added ${BotSettings.currency} to ${user.username}!`)
    .setDescription(`Successfully added ${args[1]} ${BotSettings.currency} to ${user.username}`)
    .setColor(`#8800FF`);
    message.channel.send(embed);
  }else {
      throw new Error(`Now this was unexpected, please contact the Support team!`);
  }
  
};

exports.help = {
  name: "add",
  description: "add "+BotSettings.currency+" to someones pockets",
  usage: "< username | ID | Mention > [ amount ]",
  aliases: [""],
};
