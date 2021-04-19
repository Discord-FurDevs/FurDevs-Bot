const { MessageEmbed } = require("discord.js");
const { checkBotOwner } = require("./../../utils/permissions")
const beautify = require("beautify");

exports.run = async (client, message, args) => {
    await message.delete()
    await checkBotOwner(message)
    if(!args[0]){
        throw new Error("Please Provide JS Code you would like to Evaluate\n Usage: \`J>eval < Code to Evaluate >\`")
    }

        var script = args.join(' ')

        try{
        // Evaluate the script
        const evaluated = eval(script);
        let evaled 
        evaled = require("util").inspect(evaluated, {depth: 5})
        // Process the output
        const embed = new MessageEmbed()
            .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
            )
            .setTitle(`Evaluate`)
            .setColor(`#8800FF`)
            .setTimestamp()
            .addField(":inbox_tray: Input: ",`\`\`\`js\n${beautify(script, { format: "js" })} \`\`\``)
            .addField(":outbox_tray: Output", `\`\`\`js\n${evaled}\`\`\``)
            
            .setFooter(`User ID: ${message.author.id}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
            
            if(evaluated && evaluated["then"]) {
               embed.addField(":outbox_tray: Promise Output", `\`\`\`js\n${await Promise.resolve(evaluated)}\`\`\``)
            }
            embed.addField("Type of: ", `\`\`\`${typeof evaluated.constructor.name}\`\`\``)
            return message.channel.send(embed);
        }catch(err){
            throw new Error(err)
        }
};

exports.help = {
    name: "eval",
    description: "Get the bot's ping",
    usage: "eval",
    aliases: ["evaluate", "e"],
};
