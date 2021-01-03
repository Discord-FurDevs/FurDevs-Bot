const { usernameResolver } = require("./../../utils/resolvers/username");
const MembersConfig = require('./../../database/models/MembersConfig')

exports.run = async (client, message, args) => {
  await message.delete();
  if(!args[0]){
    throw new Error("Please specify a user by providing the name, mention, or userID of that user ")
  }else if(!args[1]){
    throw new Error("Please Provide an amount of reps you want to give to that user")
  }else if(args[1]){
    if(isNaN(args[1])){
      throw new Error("That's not a number!")
    }
  }
  const user = await usernameResolver(message, args[0]);
  const repsAdd = parseInt(args[1]);
  const settings = await message.guild.members.cache.get(user.id).settings();
  let newReps = settings.reps + repsAdd
  console.log(newReps)
  await MembersConfig.updateOne({
    _id: settings._id
  }, {
    reps: newReps 
  });
  console.log(settings);
};

exports.help = {
  name: "addrep",
  description: "Add reps in bulk",
  usage: "< Username | ID | Metion > [ number( default = 1) ]",
  aliases: [""],
};
