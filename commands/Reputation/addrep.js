const { usernameResolver } = require("./../../utils/resolvers/username");
const MembersConfig = require('./../../database/models/MembersConfig')

exports.run = async (client, message, args) => {
  await message.delete();
  const user = await usernameResolver(message, args[0]);
  const repsAdd = args[1];
  const settings = await message.guild.members.cache.get(user.id).settings();
  let newReps = settings.reps + repsAdd
  await MembersConfig.updateOne(
    {
        userID: user.id,
        guildID: message.guild.id
    },
    {
        rep: newReps
    }
  ).catch((err) => {
      console.log(err)
  })
  console.log(settings);
};

exports.help = {
  name: "addrep",
  description: "Add reps in bulk",
  usage: "< Username | ID | Metion > [ number( default = 1) ]",
  aliases: [""],
};
