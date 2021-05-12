const Discord = require("discord.js")
const {
  checkBotOwner
} = require("../../utils/permissions")
const GuildConfig = require("../../database/models/GuildConfig")

exports.run = async (client, message, args) => {
  // Delete the original command message
  message.delete();

  var prefix = args[0]
  if (!prefix) {
    const GuildSettings = await message.guild.settings()

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag}`,
        `${message.author.displayAvatarURL({ dynamic:true })}`
      )
      .setTitle(`Prefix - Current Prefix!`)
      .setDescription(`The Prefix set for this guild is \`${GuildSettings.prefix}\`\nIf you wish to change that prefix you can do \`${GuildSettings.prefix}prefix < new prefix >\``)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
      .setColor(`#8800FF`);
    return message.channel.send(embed);
  }


  if (prefix > 5) {
    throw new Error("Sorry, but I will not allow you to set a prefix with more than 5 characters.")
  }
  // This command may only be used by the bot owner
  await checkBotOwner(message);

  // Update the prefix in the database
  await GuildConfig.updateOne({
    guildID: message.guild.id
  }, {
    prefix: prefix
  });

  // Return message
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.author.tag}`,
      `${message.author.displayAvatarURL({ dynamic:true })}`
    )
    .setTitle(`Prefix - Bot prefix was changed!`)
    .setDescription(`The Prefix is now \`${prefix}\``)
    .setTimestamp()
    .setFooter(`User ID: ${message.author.id}`)
    .setColor(`#8800FF`);
  return message.channel.send(embed);
};

exports.help = {
  name: "prefix",
  description: "Change the bot prefix for your guild.",
  usage: "< new prefix >",
  aliases: [],
};