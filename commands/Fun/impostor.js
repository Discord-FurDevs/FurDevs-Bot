const { MessageEmbed } = require("discord.js")
const { usernameResolver } = require("./../../utils/resolvers/username")
var imposterDetector = [true, false]

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        const username = args[0]
        var blames = await usernameResolver(message, username)
    }
    const impostor = Math.floor(Math.random() * imposterDetector.length)
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`, 
            `${message.author.displayAvatarURL({dynamic: true})}`
        )
        .setTitle("Impostor Command")
        .setColor("#8800FF")
        .setFooter(`User ID: ${message.author.id}`)
        .setDescription(`
                .      　。　　　　•　    　ﾟ　　。
        　　.　　　.　　　  　　.　　　　　。　　   。　.
         　.　　      。　        ඞ   。　    .    •
         .      ${blames ? blames : message.author} was ${impostor ? "" : "Not"} The Imposter　 。　.
        　 　　。　　　　　　ﾟ　　　.　　　　　.
        ,　　　　.　 .　　       .
        `)
        .setTimestamp();
        message.channel.send(embed)
};

exports.help = {
    name: "impostor",
    description: "You do be looking kinda sus though",
    usage: "",
    aliases: [],
};
