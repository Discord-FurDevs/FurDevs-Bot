const BotSettings = require("./../../settings.json");
const { MessageEmbed } = require("discord.js");
const { usernameResolver } = require("./../../utils/resolvers/username");

exports.run = async (client, message, args) => {
  await message.delete();

  if(args[0] === "withdraw") {
    if(isNaN(args[1])) throw new Error("Please specify a valid amount ");
    let settings = message.member.settings();
        if(!message.member.removeBank(args[1])) throw new Error(`You don't have enough ${BotSettings.currency} in your Bank! `);
        message.member.add(args[1]);
        
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`Withdrawn ${BotSettings.currency} from bank`)
        .setDescription(`Successfully withdrawn ${args[1]} ${BotSettings.currency} from the bank\n\n**Current balance in bank: ${settings.bankCoins-args[1]}** ${BotSettings.currency}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/707425515945852949/797640590665056277/th.jpg")
        .setColor(`#8800FF`);
        message.channel.send(embed);
  }else if(args[0] === "deposit") {
    if(isNaN(args[1])) throw new Error("Please specify a valid amount ");
    let settings = message.member.settings();
        if(!message.member.remove(args[1])) throw new Error(`You don't have enough ${BotSettings.currency} in your pockets! `);
        message.member.addBank(args[1]);
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`Deposited ${BotSettings.currency} into bank`)
        .setDescription(`Successfully deposited ${args[1]} ${BotSettings.currency} into the bank\n\n**Current balance in bank: ${settings.bankCoins+args[1]}** ${BotSettings.currency}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/707425515945852949/797640590665056277/th.jpg")
        .setColor(`#8800FF`);
        message.channel.send(embed);
  }else if(args[0] === "add"){
    if(!message.member.roles.cache.has(message.guild.settings().bankerRole)) throw new Error("You need to have a Banker Role, to be able to execute this command!");
    if(!message.member.roles.cache.has(message.guild.settings().bankerRole)) throw new Error("You need to have a Banker Role, to be able to execute this command!");
    if(!args[1]) throw new Error("Please specify a user by providing the name, mention, or userID of that user ");
    if(!args[2] || isNaN(args[2])) throw new Error("Please specify an amount!");
    const user = await usernameResolver(message, args[1]);
    const guildMember = message.guild.members.cache.get(user.id);
    let settings = guildMember.settings();
        if(!message.member.addBank(args[2])) throw new Error(`This was unexpected, please contact the support team! `);
        
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`Added ${BotSettings.currency} to bank`)
        .setDescription(`Successfully added ${args[2]} ${BotSettings.currency} to the bank account of ${user.username}\n\n**Current balance in bank: ${settings.bankCoins+Number(args[2])}** ${BotSettings.currency}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/707425515945852949/797640590665056277/th.jpg")
        .setColor(`#8800FF`);
        message.channel.send(embed);
  }else if(args[0] === "remove"){
    if(!message.member.roles.cache.has(message.guild.settings().bankerRole)) throw new Error("You need to have a Banker Role, to be able to execute this command!");
    if(!args[1]) throw new Error("Please specify a user by providing the name, mention, or userID of that user ");
    if(!args[2] || isNaN(args[2])) throw new Error("Please specify an amount!");
    const user = await usernameResolver(message, args[1]);
    const guildMember = message.guild.members.cache.get(user.id);
    let settings = guildMember.settings();
        if(!message.member.removeBank(args[2])) throw new Error(`They don't have enough ${BotSettings.currency} in their Bank! `);
        
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`Removed ${BotSettings.currency} from bank`)
        .setDescription(`Successfully removed ${args[2]} ${BotSettings.currency} from the bank account of ${user.username}\n\n**Current balance in bank: ${settings.bankCoins-Number(args[2])}** ${BotSettings.currency}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/707425515945852949/797640590665056277/th.jpg")
        .setColor(`#8800FF`);
        message.channel.send(embed);
  }else {
    let settings = message.member.settings();
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
    .setTitle(`Bank account of ${message.author.username}`)
    .setDescription(`The current balance in your account is **${settings.bankCoins ? settings.bankCoins : "0"}** ${BotSettings.currency}\n\nUser \`>bank withdraw [amount]\` or \`>bank deposit [amount]\` to withdraw or deposit ${BotSettings.currency} into your bank\n\n${BotSettings.currency} that is in your bank account cant be stolen from other Users!`)
    .setThumbnail("https://cdn.discordapp.com/attachments/707425515945852949/797640590665056277/th.jpg")
    .setColor(`#8800FF`);
    message.channel.send(embed);
  }

};

exports.help = {
  name: "bank",
  description: "Manage your bank account!",
  usage: "< withdraw | deposit > [ amount ]",
  aliases: [""],
};
