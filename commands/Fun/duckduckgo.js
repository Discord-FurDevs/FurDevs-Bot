const { MessageEmbed } = require("discord.js")
const { search } = require("node-ddg")

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        const embed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({dynamic: true})}`
            )
            .setTitle("Duckduckgo Command")
            .setColor("#8800FF")
            .setDescription(`Searching for ${args.slice(0)}`)
            .setFooter(`User ID: ${message.author.id}`)
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwu_mlDz1yTd7Fs7fN8QTblKiYXrIyYTqng&usqp=CAU")
            .setTimestamp();
            let msg = await message.channel.send(embed)
        await search({ query: args.join("+"), maxResults: 3 }).then((results) => {
            results.forEach(result => {
                embed.addField(`[${result.title}](${result.url})`, `${result.body}`)
            })
        }).catch((err) => console.error(err))
        embed.setDescription(" ")
        await msg.edit(embed)


    }else{
        throw new Error("You gotta give me something to search.")
    }

};

exports.help = {
    name: "duckduckgo",
    description: "Search Something up!",
    usage: "[ query ]",
    aliases: ["search", "google"],
};