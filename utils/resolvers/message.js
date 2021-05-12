const snowflakeRegex = /^(\d{17,19})$/

async function messageResolver(message, snowflake) {
const msg = snowflakeRegex.test(snowflake)
    ? await message.channel.messages
        .fetch(snowflake)
        .catch(() => null)
    : undefined
    if(msg) return msg;

    throw new Error(`Invalid Message: ${snowflake} Remember, the bot can only resolve message in the same channel `)
}

exports.messageResolver = messageResolver