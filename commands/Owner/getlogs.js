// Added by Nepgfurmixpro#1717 to output the console log for easy dev purposes

const { checkBotOwner } = require("./../../utils/permissions")

exports.run = async (client, message, args) => {
    await message.delete()
    await checkBotOwner(message)
    
    var str = ""
    for (log in console.logs) {
        str += console.logs[log]
    }
    var messagesToPrint = str.match(/.{1,1994}/g)
    var messages = ""
    for (index in messagesToPrint) {
        messages += `\`${messagesToPrint[index]}\`\n`
    }
    await message.channel.send(messages)
};

exports.help = {
    name: "getlogs",
    description: "Get all bot output logs",
    usage: "getlogs",
    aliases: ["getlogs"],
};