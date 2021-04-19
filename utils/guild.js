var GuildConfig = require("./../database/models/GuildConfig.js")

async function send(type, guild, content, options){
    var GuildSettings = await GuildConfig.findOne({ guildID: guild.id })
    if(!GuildSettings[type]) return;

    const channel = guild.channels.resolve(GuildSettings[type])
    if(!channel){
        console.log(`Tried to send a message in the ${type} of ${guild.id}, but the channel does not exist`)
        return
    }
    return await channel.send(content, options)
}

async function removeRole(member, role, reason){
    var guildSettings = await member.guild.settings();

    // Setting not set? Exit.
    if (!guildSettings[role]) return false;

    // Setting set, but role does not exist? Return false.
    if (!member.guild.roles.cache.has(guildSettings[role]))
      return false;

    // If the member has the role, return false.
    if (member.roles.cache.has(guildSettings[role])) return true;

    // If we reach here, remove the role.
    await member.roles.remove(guildSettings[role], reason);
    return true;
}

async function addRole(message, member, role, reason){
    var guildSettings = await message.guild.settings();
    member = message.guild.members.cache.get(member)

    // Setting not set? Exit.
    if (!guildSettings[role]) return false;

    // Setting set, but role does not exist? Return false.
    if (!message.guild.roles.cache.has(guildSettings[role]))
      return false;

    // If the member has the role, return false.
    if (member.roles.cache.has(guildSettings[role])) return true;

    // If we reach here, add the role.
    await member.roles.add(guildSettings[role], reason);
    return true;
}


exports.send = send 
exports.removeRole = removeRole 
exports.addRole = addRole 