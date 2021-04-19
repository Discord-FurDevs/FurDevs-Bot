const Discord = require("discord.js");
const { checkBotOwner } = require("./../../utils/permissions")
const exec = require("child_process").exec;
const hastebin = require("hastebin-gen");

exports.run = async (client, message, args) => {
    await message.delete()
    await checkBotOwner(message)
    const script = args.join(" ")

    if(!script){
        throw new Error("Please provide a command for me to execute");
    }

    if (
        script.toLowerCase().includes("/.|.&/") ||
        script.toLowerCase().includes("mkdir") ||
        script.toLowerCase().includes("restart") ||
        script.toLowerCase().includes("reboot") ||
        script.toLowerCase().includes("shutdown") ||
        script.toLowerCase().includes("rm")
    ) {
        throw new Error(
            `mkdir, restart, reboot, shutdown, rm, and dot based directory structures are not permitted.`
        );
    }

    // Execute the command
    const excuted = exec(`${script}`, (error, stdout) => {
        const response = error || stdout;
        if (response.length > 1024 || response.length > 1024) {
            hastebin(`${response}`, "js").then((r) => {
                const embed = new MessageEmbed()
                    .setAuthor(
                        `${message.author.tag}`,
                        `${message.author.displayAvatarURL({ dynamic: true })}`
                    )
                    .setTitle(`Execute`)
                    .setDescription(`**Ran: ${script}**\n\n[\`${r}\`](${r})`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(`#8800FF`);
                message.channel.send({
                    embed,
                });
            });
        } else {
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    `${message.author.tag}`,
                    `${message.author.displayAvatarURL({ dynamic: true })}`
                )
                .setTitle(`Execute`)
                .setDescription(
                    `**Ran: ${script}**\n\`\`\`js\n${response} \n\`\`\``,
                    {
                        code: "asciidoc",
                        split: "\n",
                    }
                )
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter(`User ID: ${message.author.id}`)
                .setColor("#8800FF");
            message.channel.send({
                embed,
            });
        }
    });
};

exports.help = {
    name: "exec",
    description: "Execute commands in the terminal.",
    usage: "exec",
    aliases: ["execute", "ex"],
};