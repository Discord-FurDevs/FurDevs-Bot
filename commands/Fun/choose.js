const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

exports.run = async (client, message, args) => {
    await message.delete();
    if(args){
        var choices = args.slice(0).join(" ").split(" or ")
    }else{
        throw new Error("Give me some choices man ( Like Should I die or stay alive )")
    }
    if(args[0] && args[1]){
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`, 
            `${message.author.displayAvatarURL({dynamic: true})}`
        )
        .setTitle("Choose Command")
        .setColor("#8800FF")
        .setFooter(`User ID: ${message.author.id}`)
        .setDescription(`I've chosen "${choices[Math.floor(Math.random() *choices.length)]}" out of the ${choices.length} choices that you have given me `)
        .setTimestamp();
        message.channel.send(embed)
    }else{
        throw new Error(`You didn't provide a second choice, for each choice make sure you sperate them with " or "`)
    }
};

exports.help = {
    name: "choose",
    description: "Make the bots decide on your life impacting decisions!.",
    usage: "",
    aliases: ["choose"],
};