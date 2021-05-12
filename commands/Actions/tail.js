const {
    MessageEmbed
  } = require('discord.js')
  let affected;
  
  exports.run = async (client, message, args) => {
    await message.delete()
    if (message.author.id !== '302878998692757514') {
      throw new Error("Hey! you're not the server son!")
    } else if (args[0]) {
      affected = []
      message.mentions.users.map(user => {
        if (message.author === user || affected.includes(user)) {
          // Do Nothing...
        } else {
          affected.push(user)
        }
      })
    } else {
      throw new Error('Who will be the person you want to hit with your tail?')
    }
  
    if (affected.length >= 1) {
      const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle('Hit by a thick tail! Ouch')
        .setColor('#8800FF')
        .setDescription(`
          ${affected.join(', ')} got hit by ${message.author}'s tail **OUCH!**
          `)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
      return message.channel.send(embed)
    } else {
      throw new Error('Who will be the person you want to hit with your tail?')
    }
  
  }
  
  exports.help = {
    name: 'tail',
    description: "Don't make Server Son mad >:O.",
    usage: '[ Mention ]',
    aliases: []
  }
