const Discord = require("discord.js");
const GuildConfig = require("../../database/models/GuildConfig");
const { roleResolver } = require("./../../utils/resolvers/role");

exports.run = async (client, message, args) => {
  // Delete the original command message
  message.delete();
  if (
    message.member.hasPermission("MANAGE_ROLES") ||
    settings.staffMembers.includes(message.author.id)
  ) {
    if (args[0]) {
      var GuildSettings = await message.guild.settings();
      var role = await roleResolver(message, args[0]);
      console.log(role.id);
      // This command may only be used by the bot owner

      // Update the prefix in the database
      await GuildConfig.updateOne(
        {
          guildID: message.guild.id,
        },
        {
          bankerRole: role.id,
        }
      );

      // Return message
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag}`,
          `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Banker - The Role is Updated!`)
        .setDescription(`The role is now ${role}`)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
        .setColor(`#8800FF`);
      return message.channel.send(embed);
    }
    if (!role) {
      var GuildSettings = await message.guild.settings();
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag}`,
          `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Banker - Current Role!`)
        .setDescription(
          `The Current Banker Role is ${GuildSettings.bankerRole ? "<@&" + GuildSettings.bankerRole + ">" : "Not Set!"}\n\nIf you wish to change that role you can do \n\`${GuildSettings.prefix}setBankerRole < Mention Role >\``
        )
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
        .setColor(`#8800FF`);
      return message.channel.send(embed);
    }
  } else {
    throw new Error(
      "Only Staff members are allowed to assign what roles should be the banker role"
    );
  }
};
exports.help = {
  name: "setbankerrole",
  description:
    "Change the banker role.",
  usage: "[ Role Mention ]",
  aliases: ["bankerrole"],
};
