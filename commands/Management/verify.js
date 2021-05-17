const {
    checkPermission,
    checkBotPermission,
} = require("../../utils/permissions");
const {
    usernameResolver
} = require("../../utils/resolvers/username");
const {
    send
} = require("../../utils/utils");
const {
    verificationLogs,
    welcomeChannel
} = require('./../../settings.json')


exports.run = async (client, message, args) => {
    await message.delete();
    const settings = await message.guild.settings();
    if (
        message.member.hasPermission("MANAGE_ROLES") ||
        settings.staffMembers.includes(message.author.id)
    ) {
        if (!args[0]) {
            throw new Error(
                "Please provide an Mention or User's ID of the User you would like to verify"
            );
        }
        var vMember = await usernameResolver(message, args[0]);
        await checkBotPermission(message, "MANAGE_ROLES");
        const guildSettings = await message.guild.settings();
        let member = message.guild.members.cache.get(vMember.id);
        if(member.roles.cache.has(guildSettings.verificationRole)) throw new Error("But the User is already verified **DUMMY**")
    
        if (guildSettings.verificationRole) {
            await member.roles.add(
                guildSettings.verificationRole,
                `Verificaton Command - Responsible: ${message.author.tag}`
            );
            message.channel.send(
                `${member} is now verified for \`${message.guild.name}\` Please Give them a warm welcome in the General Chat!${message.guild.id === "731520035717251142" ? "Here's a little copy and paste" : ""}`
            );
            if (welcomeChannel != "") {

                var wc = await message.guild.channels.cache.get(731523552636829697)
                wc.send(`[ <@&789620311107567646> ]

Salutations and welcome to **FurDevs**, ${member}!
                            
**Here are a few things you need to know to get started:**
> • <#731523544596480091> - Please read our regulations at the very top so you can know know the important information about our server such as rules for asking programming-related questions as well as how to contact staff.
> • <#731523548207775744> - Go and react to any reaction role category and it fills up on your profile! With that, we get to know you better!
> • <#732931206378684548> - Need a guide or a tutorial to start off programming? No problem! Check out this channel and take a look if what you need is in there. If not, you're free to ask on our programming channels!
> • <#734515583726518302> - Feel free to introduce yourself for others to get you to know even better! It's your choice whether to introduce yourself or not (if you ever feel uncomfortable in giving out some of your real information).
            
__Other than that, have fun and again, we welcome you in behalf of everyone! DM <@731573040273555526> if ever you require an assistance or have any queries, we're happy to help you anytime. uwu 👋__`)
            } else {
                throw new Error(
                    "The Welcome Channel does not exist! Please add that to the settings."
                )
            }
            
            return true;
        } else {
            throw new Error(
                "The Verification Role does not exist! Please set it up."
            );
        }
    } else {
        throw new Error(
            "Only Staff Members with `MANAGE_ROLES` or is in the Database are able to execute this comamnd"
        );
    }
};

exports.help = {
    name: "verify",
    description: "Verify an Specific Member",
    usage: "< Username >",
    aliases: ["verify"],
};
