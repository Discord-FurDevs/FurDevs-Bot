const { Structures } = require("discord.js");
const MembersConfig = require("./../database/models/MembersConfig");

// Users (MUST be included with GuildMember, or these properties cannot be accessed once someone leaves the guild)
Structures.extend("User", (User) => {
  class CoolUser extends User {
    constructor(client, data) {
      super(client, data);
    }

    async guildSettings(guildID) {
      const data = await MembersConfig.findOne({
        guildID: guildID,
        userID: this.id,
      });
      if (data) {
        return data;
      }
    }
  }
  return CoolUser;
});
