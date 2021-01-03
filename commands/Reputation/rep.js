const { usernameResolver } = require("./../../utils/resolvers/username");
const MembersConfig = require('./../../database/models/MembersConfig')

exports.run = async (client, message, args) => {
  await message.delete();
  if(!args[0]){
    throw new Error("Please specify a user by providing the name, mention, or userID of that user ")
  }
  const user = await usernameResolver(message, args[0]);
  const settings = await message.guild.members.cache.get(user.id).settings();
  let newReps = settings.reps+ 1
  console.log(newReps)
  await MembersConfig.updateOne({
    _id: settings._id
  }, {
    reps: newReps 
  });
};

exports.help = {
  name: "rep",
  description: "Rep Someone!",
  usage: "< Username | ID | Metion >",
  aliases: [""],
};
