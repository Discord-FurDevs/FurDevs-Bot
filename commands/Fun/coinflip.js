const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        var choice = args[0]
        var coin = ["heads", "tails"]
        if(coin.includes(choice.toLowerCase())){
            var side = coin[Math.floor(Math.random() * coin.length)]
        }else{
            throw new Error("That's not a side, your bets are either heads or tails")
        }
    }else{
        throw new Error("Give me your bets man! Heads or tails?")
    }
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`, 
            `${message.author.displayAvatarURL({dynamic: true})}`
        )
        .setTitle("CoinFlip Command")
        .setColor("#8800FF")
        .setFooter(`User ID: ${message.author.id}`)
        .setDescription(`The coin flipped **${side}** therefore You have ${side == choice ? "Won the bet": "Lost the bet"}`)
        .setTimestamp();
        message.channel.send(embed)
};

exports.help = {
    name: "coinflip",
    description: "Flip a god damn coin did you win?.",
    usage: "",
    aliases: [],
};