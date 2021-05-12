const { usernameResolver } = require("./../../utils/resolvers/username");
const MembersConfig = require('./../../database/models/MembersConfig');
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  await message.delete();
  if(!args[0]){
    throw new Error("Please specify a user by providing the name, mention, or userID of that user.");
  }
  const user = await usernameResolver(message, args[0]);
  if (user.id === message.author.id) {
    throw new Error("You gonna rep yourself somehow?");
  }
  const settings = await message.guild.members.cache.get(user.id).settings();
  let newReps = settings.reps+ 1
  console.log(newReps)
  await MembersConfig.updateOne({
    _id: settings._id
  }, {
    reps: newReps 
  });
  const embed = new MessageEmbed()
  .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
  .setTitle(`Given a Rep to ${user.username}!`)
  .addField(`Reps Then`, `${settings.reps}`)
  .addField(`Reps Now`, `${newReps}`)
  .addField(`Continue the Good Work!`, `The more reps you get the more bragging right you'll receive`)
  .setThumbnail(`https://cdn.discordapp.com/emojis/732716714072211578.png?v=1`)
  .setColor(`#8800FF`)
  message.channel.send(embed)
};

exports.help = {
  name: "rep",
  description: "Rep Someone!",
  usage: "< Username | ID | Mention >",
  aliases: [""],
};
