const { usernameResolver } = require("./../../utils/resolvers/username");
const { MessageEmbed } = require("discord.js");
const BotSettings = require("./../../settings.json");

exports.run = async (client, message, args) => {
  await message.delete();
  if(!args[0]) throw new Error("Please specify a user by providing the name, mention, or userID of that user ");
  if(!args[1] || isNaN(args[1])) throw new Error("Please specify an amount!");
  const user = await usernameResolver(message, args[0]);
  if(message.member.pay(user.id, args[1])) {
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`payed ${BotSettings.currency} to ${user.username}!`)
    .setDescription(`Successfully paid ${args[1]} ${BotSettings.currency} to ${user.username}`)
    .setColor(`#8800FF`);
    message.channel.send(embed);
  }else {
      throw new Error("Transaction failed, do you have enough money for this transaction?")
  }
  
};

exports.help = {
  name: "pay",
  description: "Pay someone "+BotSettings.currency,
  usage: "< username | ID | Mention > [ amount ]",
  aliases: [""],
};
