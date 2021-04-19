const roleRegex = /^(?:<@&)?(\d{17,19})>?$/

async function roleResolver(message, mention) {
const role = roleRegex.test(mention)
    ? await message.guild.roles
        .fetch(roleRegex.exec(mention)[1]
        )
    : null

    if(role) return role;

    throw new Error(`Invalid role: ${mention} Remember, the bot can only resolve roles from the same guild.`)
}

exports.roleResolver = roleResolver