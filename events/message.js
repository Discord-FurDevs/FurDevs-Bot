const {
    MessageEmbed
} = require("discord.js")
const MembersConfig = require('./../database/models/MembersConfig')

let timeoutBalance = new Set();


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
        await msg.awaitReactions(filter, { time: 15000 }).then(async (collected) => {
            const reaction = collected.first()
            switch(reaction.emoji.name){
                case '✅':
                    const user = message.mentions.users.first()
                    const settings = await message.guild.members.cache.get(user.id).settings();
                    let newReps = settings.reps+ 1
                    console.log(newReps)
                    await MembersConfig.updateOne({
                      _id: settings._id
                    }, {
                      reps: newReps 
                    });
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setTitle(`Given a Rep to ${user.username}!`)
                    .addField(`Reps Then`, `${settings.reps}`)
                    .addField(`Reps Now`, `${newReps}`)
                    .addField(`Continue the Good Work!`, `The more reps you get the more bragging right you'll receive`)
                    .setThumbnail(`https://cdn.discordapp.com/emojis/732716714072211578.png?v=1`)
                    .setColor(`#8800FF`)
                    return message.channel.send(embed)
                case "❌":
                    return message.channel.send("Aw qwq What a bummer")
            }
        })
        
    }

    // Money generation
    if(!timeoutBalance.has(message.author.id) && client.coinDropArray.length > 0) {
        let balanceAdd = Math.floor(Math.random() * client.coinDropArray.length);
        message.member.add(client.coinDropArray[balanceAdd]);
        timeoutBalance.add(message.author.id);
        setTimeout(() => timeoutBalance.delete(message.author.id), 60000);
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

