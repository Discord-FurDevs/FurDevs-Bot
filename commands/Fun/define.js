const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        let definitionNumber = 0
        let word = args.join(" ")
        
        let data = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARYAPI}`).then(res => res.json()).catch(err => {
            throw new Error("Error Processing the Word... It's probably Dictionary API being weird.... Try Again Later!")
        })
            let embed = new MessageEmbed()
             .setAuthor(
                 `${message.author.tag}`, 
                 `${message.author.displayAvatarURL({dynamic: true})}`
             )
            .setTitle(`Definition of ${word}`)
            .setColor("#8800FF")
            .setFooter(`User ID: ${message.author.id}`)
            .setTimestamp();
            try{

                data[0].shortdef.forEach(defin => {
                    definitionNumber++
                    embed.addField(`Definition ${definitionNumber}`, `${defin}`)
                })
            }catch(err){
                throw new Error("Error Processing the word... Are you sure that word exist in the dictionary?")
            }
            message.channel.send(embed)
    }else{
        throw new Error("Give me something I can define for you!")
    }
};

exports.help = {
    name: "define",
    description: "Don't know a word? Figure it out with this command!",
    usage: "< Word >",
    aliases: [],
};