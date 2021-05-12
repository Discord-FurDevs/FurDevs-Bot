const { defaultPrefix } = require("./../../settings.json")
const Discord = require("discord.js")
Discord.DiscordMenu = require("../../utils/DiscordMenu")
var _ = require('lodash');


exports.run = async (client, message, args) => {
    message.delete()
    var prefix = defaultPrefix
    if(args[0]){
        let command = args[0]
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(cmd){
            return commandHelp(command)
        }
    }
    async function commandHelp (command){
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
      var embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag}`,
          `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Help - ${prefix}${cmd.help.name}`)
        .setColor(`#8800FF`)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
        .addField(
          "Usage",
          `\`${prefix}${cmd.help.name} ${
            cmd.help.usage ? cmd.help.usage : ""
          }\``
        )
        .addField(
          "Description",
          cmd.help.description || "No Description provided"
        );

      if (cmd.help.aliases) {
        embed.addField(
          "Aliases",
          `\`${prefix}${cmd.help.aliases.join("\`, \`>")}\``
        );
      }

      return message.channel.send({ embed: embed });
    };
    if (command) {
      commandHelp(command);
    } else if (!command) {
      var commandsMain = [];
      var commands = [];
      var _commands = [];
      var commands2 = [];

      // Get all the commands
        for (var command of client.commands) {
          commands.push(command);
          commandsMain.push(command);
        }
      }
      // Now, break the commands up into groups of 10 for pagination.
        commands.sort()
    commandsMain.sort()
      while (commands.length > 0) {
        _commands.push(commands.shift());
        if (_commands.length > 4) {
          commands2.push(_.cloneDeep(_commands));
          _commands = [];
        }
      }
      if (_commands.length > 0) {
        commands2.push(_.cloneDeep(_commands));
      }

      // Construct the Discord Menu
      return new Discord.DiscordMenu(
        message.channel,
        message.author.id,
        commands2.map((group) => {
          var groupEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${message.author.tag}`,
              `${message.author.displayAvatarURL({ dynamic: true })}`
            )
            .setTitle(`Help - Command list`)
            .setDescription(
              `Here is a list of available commands in the bot ( use the prefix **${prefix}** at the beginning of a command name to execute it ). Use the reactions to scroll between pages. Type a command name to view more info about that command.`
            )
            .setColor(`#8800FF`)
            .setFooter(`User ID: ${message.author.id}`)
            .setTimestamp();
          group.map((cmd) => {
            var name = cmd[1].help.name;
            var information = cmd[1].help.description;
            groupEmbed.addField(name, information);
          });
          return groupEmbed;
        }),
        commandsMain.map((cmd) => {
          return {
            message: cmd[1].help.name,
            fn: () => {
              return commandHelp(cmd[1].help.name);
            },
          };
        })
      );
    }





exports.help = {
    name: "help",
    description: "Display all or a detailed version of the commands the bot provides.",
    usage: "[ command ]",
    aliases: ["help", "h"],
}