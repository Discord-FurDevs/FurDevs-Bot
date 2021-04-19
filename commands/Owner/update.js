const { MessageEmbed } = require("discord.js");
const { checkBotOwner } = require("../../utils/permissions")
const { execute } = require("../../utils/utils");

exports.run = async (client, message, args) => {
    await message.delete()
    await checkBotOwner(message)
    const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`<a:uodating:761724854742417438> Update - Updating bot...`)
        .setColor(`BLUE`)
        .setDescription(`<a:windows_loading:732716714273406976> This may take a bit...`)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`);
    var message = await message.channel.send(embed);

    // Execute the update script
	if (args[0] === "dev") {
		branch = "Dev";
	} else {
		branch = "master";
	}
    let result = await execute("sh update.sh " + args[0]);

    // Send the result
    if (result[0]) {
        throw new Error(result[0]);
    } else {
        const output = result.slice(1)
        const complete = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic: true })}`
            )
            .setColor(`#8800FF`)
            .setTitle(`Update - Bot was updated!`)
            .setDescription(
                `You may now use the reload command to reload the bot with the New Features. \n \`\`\`${output}\`\`\``
            )
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`);
        message.edit(complete);
    }
};

exports.help = {
    name: "update",
    description: "Update the bot.",
    usage: "update",
    aliases: [],
};
