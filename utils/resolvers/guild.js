const snowflakeRegex = /^(\d{17,19})$/

async function guildResolver(client, snowflake) {
const guild = snowflakeRegex.test(snowflake)
    ? client.guilds.resolve(snowflake)
    : null;
if(guild) return guild;
throw new Error(`Invalid guild: ${snowflake}`)
}

exports.guildResolver = guildResolver