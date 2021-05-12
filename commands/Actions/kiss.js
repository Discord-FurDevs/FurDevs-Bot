const {
  MessageEmbed
} = require('discord.js')
let affected = [];
 
exports.run = async (client, message, args) => {
  await message.delete()
  if (args[0]) {
    message.mentions.users.map(user => {
      if (!message.author === user || !affected.includes(user)) {
          affected.push(user.username)
      }
    })
  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Kiss')
      .setColor('#8800FF')
      .setDescription(`
      ${message.author} Somehow Kissed themselves...
      `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)
  }

  if (affected.length >= 1) {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Kissed')
      .setColor('#8800FF')
      .setDescription(`
        ${affected.join(', ')} got kissed by ${message.author} That's very cute ^w^
        `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)

  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Kiss')
      .setColor('#8800FF')
      .setDescription(`
      ${message.author} Somehow Kissed themselves...
      `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)
  }

}

exports.help = {
  name: 'kiss',
  description: 'Kiss Someone or yourself.!',
  usage: '[ Mention ]',
  aliases: []
}