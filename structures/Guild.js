const { Structures } = require("discord.js");
const GuildsConfig = require("./../database/models/GuildConfig");
const MembersConfig = require("./../database/models/MembersConfig");

// Guilds
Structures.extend("Guild", (Guild) => {
  class CoolGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      GuildsConfig.findOne(
        {
          guildID: this.id,
        },
        (err, res) => {
          if (err) return err;
          if (!res) {
            const newGuild = new GuildsConfig({
              guildID: this.id,
            });
            newGuild.save(function (err) {
              if (err) {
                console.log(err);
              }
              console.log("Guild Settings have been created");
            });
          }
        }
      );
    }

    // per-guild settings
    async settings() {
      try {
        const data = await GuildsConfig.findOne({
          guildID: this.id,
        });
        if (data) {
          return data;
        } else {
          throw new Error("Uh cheif, We have a problem");
        }
      } catch (err) {
        throw new Error(
          "Please take a Screenshot of this embed and send it to the Support Server\n``` " +
            err +
            "```"
        );
      }
    }

    // Per-guild rules
    async rules() {
      try {
        const data = await RulesConfig.findOne({
          guildID: this.id,
        });
        if (data) {
          return data;
        }
      } catch (err) {
        throw new Error(
          "Please take a Screenshot of this embed and send it to the Support Server\n``` " +
            err +
            "```"
        );
      }
    }

    /**
     * Get the total amount of money from the Guild
     */
    async getMoneyAll() {
      let docs = await MembersConfig.find({}, "coins bankCoins").exec();
      let bal = 0;
      docs.forEach(doc => {
        bal += doc.coins + doc.bankCoins;
      });
      return bal;
    }
  }

  return CoolGuild;
});
