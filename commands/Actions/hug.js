const {
  MessageEmbed
} = require('discord.js')
let affected;
 
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
      .setTitle('Hug?')
      .setColor('#8800FF')
      .setDescription(`
      ${message.author} Hug themselves... Poor Dude aye yo someone hug this person :C
      `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)
  }

  if (affected.length >= 1) {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Hugs!')
      .setColor('#8800FF')
      .setDescription(`
        ${affected.join(', ')} got hugged by ${message.author} That's very cute ^w^
        `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)

  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Hug?')
      .setColor('#8800FF')
      .setDescription(`
      ${message.author} Hug themselves... Poor Dude aye yo someone hug this person :C
      `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    return message.channel.send(embed)
  }

}

exports.help = {
  name: 'hug',
  description: 'Hug Someone or yourself.!',
  usage: '[ Mention ]',
  aliases: []
}