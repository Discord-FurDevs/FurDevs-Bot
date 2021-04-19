const { Structures } = require("discord.js");
const MembersConfig = require("./../database/models/MembersConfig");

// Guild members
Structures.extend("GuildMember", (GuildMember) => {
  class CoolGuildMember extends GuildMember {
    constructor(client, data, guild) {
      super(client, data, guild);

      // Initialize the guild members
      MembersConfig.findOne(
        {
          guildID: this.guild.id,
          userID: this.id,
        },
        (err, res) => {
          if (err) return err;
          if (!res) {
            const newGuild = new MembersConfig({
              guildID: this.guild.id,
              userID: this.id,
            });
            newGuild.save(function (err) {
              if (err) {
                console.log(err);
              }
            });
          }
        }
      );
    }

    // Per-member settings
    async settings() {
      const data = await MembersConfig.findOne({
        guildID: this.guild.id,
        userID: this.id,
      });
      if (data) {
        return data;
      }
    }

    /**
     * Remove coins from the Member
     * If process succeeds it returns true if not it returns false
     * @param {Number} amount 
     */
    async remove(amount) {
      if(isNaN(amount)) throw new Error("argument amount must be of type Number");
      let settings = await this.settings();
      if(amount <= settings.coins) {
        await MembersConfig.updateOne({
          _id: settings._id
        }, {
          coins: (settings.coins-amount).toPrecision(4)
        });
        return true;
      }else {
        return false;
      }
    }

    /**
     * Remove coins from the Members Bank account
     * If process succeeds it returns true, if not it returns false
     * @param {Number} amount 
     */
    async removeBank(amount) {
      if(isNaN(amount)) throw new Error("argument amount must be of type Number");
      let settings = await this.settings();
      if(amount <= settings.bankCoins) {
        await MembersConfig.updateOne({
          _id: settings._id
        }, {
          bankCoins: (settings.bankCoins-amount).toPrecision(4)
        });
        return true;
      }else {
        return false;
      }
    }

    /**
     * Adds coins to Member
     * @param {Number} amount 
     */
    async add(amount) {
      if(isNaN(amount)) throw new Error("argument amount must be of type Number");
      let settings = await this.settings();
      await MembersConfig.updateOne({
        _id: settings._id
      }, {
        coins: (settings.coins+amount).toPrecision(4)
      });
    }

    /**
     * Add coins to the Members Bank account
     * @param {Number} amount 
     */
    async addBank(amount) {
      if(isNaN(amount)) throw new Error("argument amount must be of type Number");
      let settings = this.settings();
      await MembersConfig.updateOne({
        _id: settings._id
      }, {
        bankCoins: (settings.bankCoins+amount).toPrecision(4)
      });
    }

    /**
     * Pay another member coins
     * returns false if fails
     * 
     * Cause of this could be the Member not having enough money
     * 
     * returns true otherwise
     * @param {Snowflake} userID 
     * @param {Number} amount 
     */
    async pay(userID, amount) {
      if(isNaN(amount)) throw new Error("argument amount must be of type Number");
      
      if(this.removeBank(amount)) {
        let member = this.guild.members.cache.get(userID);
        if(member == undefined) return false;
        await member.add(amount);
        return true;
      }else if(this.remove(amount)) {
        let member = this.guild.members.cache.get(userID);
        if(member == undefined) return false;
        await member.add(amount);
        return true;
      } else {
        return false;
      }
    }

    // Member moderation logs
  }

  return CoolGuildMember;
});
