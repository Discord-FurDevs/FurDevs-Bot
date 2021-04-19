const {
  MessageEmbed
} = require('discord.js')
let affected

exports.run = async (client, message, args) => {
  await message.delete()
  if (args[0]) {
    affected = []
    message.mentions.users.map(user => {
      if (message.author === user || affected.includes(user)) {
        // Do Nothing...
      } else {
        affected.push(user)
      }
    })
  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Bellyrub Yourself?')
      .setColor('#8800FF')
      .setDescription(`
        ${message.author} belly rubbed their own belly qwq
        `)
      .setTimestamp()
      .setImage('https://media.giphy.com/media/gCANwADwdazG8/giphy.gif')
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)
  }

  if (affected.length >= 1) {

    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Belly Rubs!')
      .setColor('#8800FF')
      .setDescription(`
       ${message.author} belly rubbed ${affected.join(', ')}'s ${affected.includes(client.user) ? 'uwu' : "Dann, y'all should count me in owo"}
      `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
      .setImage('https://media.giphy.com/media/1P00ZTh1zpww2bnT2v/giphy.gif')

    return message.channel.send(embed)
  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Belly Rub Yourself?')
      .setColor('#8800FF')
      .setDescription(`
        ${message.author} belly rubbed their own belly qwq
        `)
      .setTimestamp()
      .setImage('https://media.giphy.com/media/gCANwADwdazG8/giphy.gif')
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)
  }

}

exports.help = {
  name: 'bellyrub',
  description: 'Rubs someone belly!',
  usage: '[ Mention ]',
  aliases: []
}