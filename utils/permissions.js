const { botOwner } = require("./../settings.json")

function checkPermission(message, permission) {
    if (!message.member.hasPermission(permission)) {
        throw new Error(`This requires \`${permission}\` permissions, but you do not have them!`);
      }else{
          return true
      }
}

function checkBotPermission(message, permission) {
    if (!message.guild.me.hasPermission(permission)) {
        throw new Error(`This requires me to have \`${permission}\` permissions, but I do not have them!`);
      }
}

function checkBotOwner(message) {
    if (!botOwner.includes(message.author.id)) {
        throw new Error(`This command may only be used by the bot owner`);
    }
}

exports.checkBotPermission = checkBotPermission
exports.checkBotOwner = checkBotOwner
exports.checkPermission = checkPermission