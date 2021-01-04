const {
    MessageEmbed
} = require("discord.js")

module.exports = async (client, message) => {
    if (message.author && message.author.id === client.user.id) return;
    if (message.author.bot) return;
    if (!message.guild && message.author) {
        message.author.send(
            `Oh hi there! Sorry but I don't really have anything to say in DMs. Please talk to me in a guild.`
        );
        return;
    }


    var GuildConfig = await message.guild.settings()
    var {
        errorLogChannel
    } = require("../settings.json")
    var command;
    var commandParts;

    console.log(message.content)
    if(message.content.toLowerCase().includes("thanks") && message.mentions.members){
        let msg = await message.channel.send("Would you like to give a rep to this user")
        await msg.react("✅")
        await msg.react("❌")
        const filter = (reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❌'  && user.id === message.author.id;
        await msg.awaitReactions(filter, { time: 15000 }).then((collected) => {
            const reaction = collected.first()
            switch(reaction.emoji.name){
                case '✅':
                    message.channel.send("Woo") 
                case "❌":
                    message.channel.send("Aw qwq What a bummer")
            }
        })
        
    }

    // If the user pings the bot the bot will respond with it's prefix
    const mentionRegex = RegExp(`^<@!${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);
    if (message.content.match(mentionRegex)) {
        return message.channel.send(`Heya ${message.author}! My Prefix is \`${GuildConfig.prefix}\``);
    }

    var prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : GuildConfig.prefix;
    // Is a command by a guild member who is not a bot? If so execute it
    if (message.content.startsWith(prefix)) {
        if (message.member && message.author && !message.author.bot) {
            commandParts = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = commandParts.shift().toLowerCase();
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            if (!cmd) {
                return console.log(`Discord: Command Invalid: ${command} by ${message.author.tag}`)
            } else {
                try {
                    await cmd.run(client, message, commandParts);
                } catch (e) {
                    try {
                        const errorMessage = new MessageEmbed()
                            .setTitle("❌ An Error has Occured!")
                            .setThumbnail(
                                `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
                            )
                            .setDescription(`\`${command}\` failed to execute with this error \n\n${e.message}\n\u200b`)
                            .setColor("#ee110f")
                        console.log(`${client.fdevsError}: ${command} was executed but failed with an error;\n${e}`)
                        return message.channel.send(errorMessage)
                    } catch {
                        console.log(`${client.fdevsError}: ${command} was executed but failed with an error;\n${e}`)
                        return;
                    }
                }
            }
            console.log(`Discord: Command Executed: ${command} by ${message.author.tag}`)

        }
    }
};