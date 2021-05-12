const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    await message.delete()
    const embed = new MessageEmbed()
        .setTitle("Don't Ask to Ask... Just Ask your Question!")
        .setDescription(        "Every now and then, in online chat rooms I hang around in, someone pops in and says something in the lines of,\n" +
            "\n" +
            "> Foobar123:\n" +
            "\n" +
            "> Any Java experts around? \n" +
            "\n" +
            "This is bad form, for several reasons. What the person is actually asking here is,\n" +
            "\n" +
            "> Foobar123:\n" +
            "\n" +
            "> Any Java experts around who are willing to commit into looking into my problem, whatever that may turn out to be, even if it's not actually related to Java or if someone who doesn't know anything about Java could actually answer my question? \n" +
            "\n" +
            "There are plenty of reasons why people who DO have the knowledge would not admit to it. By asking, you're asking for more than what you think you're asking.\n" +
            "\n" +
            "You're asking people to take responsibility. You're questioning people's confidence in their abilities. You're also unnecessarily walling other people out. I often answer questions related to languages or libraries I have never used, because the answers are (in a programmer kind of way) common sense.\n" +
            "\n" +
            "Alternatively, it can be seen as..\n" +
            "\n" +
            "> Foobar123:\n" +
            "\n" +
            "> I have a question about Java but I'm too lazy to actually formalize it in words unless there's someone on the channel who might be able to answer it \n" +
            "\n" +
            "..which is just lazy. If you're not willing to do the work to solve your problem, why should we?\n" +
            "\n" +
            "The solution is not to ask to ask, but just to ask. Someone who is idling on the channel and only every now and then glances what's going on is unlikely to answer to your \"asking to ask\" question, but your actual problem description may pique their interest and get them to answer.\n" +
            "\n" +
            "So, to summarize, don't ask \"Any Java experts around?\", but rather ask \"How do I do [problem] with Java and [other relevant info]?\" ")
    .setColor("#8800FF")
        .setFooter("Credits to https://dontasktoask.com/")
    await message.channel.send(embed)
};

exports.help = {
    name: "justask",
    description: "CaN sOmEoNe HeLp Me WiTh My CoDe?????",
    usage: "justask",
    aliases: ["ask", "data"],
};