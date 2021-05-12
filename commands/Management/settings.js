const {
    checkBotOwner
} = require("../../utils/permissions")
const {
    MessageEmbed
} = require("discord.js")
const settings = require("../../settings.json")
const Discord = require("discord.js")
Discord.DiscordMenu = require("../../utils/DiscordMenu")
var _ = require('lodash');



exports.run = async (client, message, args) => {
    await message.delete()
    if (args[0] === "show") {

        if (args[1] === "guild") {
            await checkBotOwner(message)
            const GuildSettings = await message.guild.settings()
            const embed = new MessageEmbed()
                .setAuthor(
                    `${message.author.tag}`,
                    `${message.author.displayAvatarURL({ dynamic: true })}`
                )
                .setColor("#8800FF")
                .setTitle("Guild Settings")
                .addField(`Guild ID:`, `${GuildSettings.guildID}`)
                .addField(`Prefix:`, `${GuildSettings.prefix}`)
                .addField(`Disabled Commands:`, `\`\`\`${GuildSettings.disabledCommands ? GuildSettings.disabledCommands.forEach(cmd => cmd.name) : "None Set"}\`\`\``)
                .addField(`Banker Role (Coming Soon):`, `${GuildSettings.bankerRole ? GuildSettings.bankerRole : "None Set"}`)
                .addField(`Verification Role:`, `${GuildSettings.verificationRole ? message.guild.role.resolve(GuildSettings.verificationRole) : "None Set" }`)
                .addField(`Verification Logging:`, `${GuildSettings.verificationLogging ? GuildSettings.verificationLogging : "None Set"  }`)
                .addField(`Reputation System:`, `${GuildSettings.reputationSystem ? GuildSettings.reputationSystem : "Disabled"}`)
                .addField(`Reputation Emoji:`, `${GuildSettings.reputationEmoji ? GuildSettings.reputationEmoji : "None Set"}`)
                .setFooter(`User ID: ${message.author.id}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
            message.channel.send(embed)

        } else if(args[1] === "botjson") {
			// botjson option made by charmines#1522 for looking at the bots settings.json
            const botjsonembed = new MessageEmbed()
                .setAuthor(
                    `${message.author.tag}`,
                    `${message.author.displayAvatarURL({ dynamic: true })}`
                )
                .setColor("#8800FF")
                .setTitle("Bot Settings.json")
                .setFooter(`User ID: ${message.author.id}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
			for (key in settings) {
                if (typeof settings[key] === 'object') {
                    botjsonembed.addField(`${key}:`, `${JSON.stringify(settings[key])}`)
                } else if(settings[key]){
					botjsonembed.addField(`${key}:`, `${settings[key]}`)
				}
			}
			message.channel.send(botjsonembed)
		} else {
            throw new Error(`To view guild settings do \`${settings.defaultPrefix}settings show guild\` `)
        }
    } else {
        throw new Error("Where's args[0] ( Show )")
    }
}

exports.help = {
    name: "settings",
    description: "View Database Information on the Bot or the Guild",
    usage: "< show | change > <guild | logging | botjson> [ overrideChannel ] ( Only works if you are changeing logging >",
    aliases: ["settings", "config"],
};