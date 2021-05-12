const ClientConfig = require("./../database/models/ClientsConfig");
const settings = require("./../settings.json")

/**
 * Client Data
 */

async function getClientSettings(){
    const data = await ClientConfig.findOne({ id: 1 })
    if(data){
        return data
    }else{
        return createClientSettings()
    }
    
}

async function createClientSettings(){
    const clientSettings = await ClientConfig.findOne({ id: 1 }, (err, res) => {
        if(err) return err;
        if(!res){
            const newClient = new ClientConfig({
                id: 1
            })
            newClient.save(function(err){
                if(err){
                    console.log(err)
                }
                console.log("Client Settings have been created")
            })
            
        }else{
            console.log("The createClientSettings() function was called, but they ClientSettings is already created.")
            return clientSettings;
        }
    })
}






async function createGuild (guild){
    try{
    await GuildsConfig.findOne({ guildID: guild.id }, (err, res) => {
        if(err) return err;
        if(!res){
            const newGuild = new GuildsConfig({
                guildID: guild.id
            })
            newGuild.save(function(err){
                if(err){
                    console.log(err)
                }
                console.log("Guild Settings have been created")
            })
            let channel = guild.channels.cache
            .sort((a, b) => {
              // Channels without a parent always come first.
              if (!a.parent && b.parent) return -1;
              if (!b.parent && a.parent) return 1;

              // If both channels do not have a parent, use positioning.
              if (!a.parent && !b.parent) return a.position - b.position;

              if (a.parent && b.parent) {
                // If both channels do have a parent, but the parents are not the same, use position of the parent.
                if (a.parentID !== b.parentID) return a.parent.position - b.parent.position;

                // If both channels have the same parent, use inner position.
                if (a.parentID === b.parentID) return a.position - b.position;
              }

              return 0;
            })
            .find(
              (chan) =>
                chan.type === "text" &&
                chan.permissionsFor(guild.me).has("SEND_MESSAGES") &&
                chan
                  .permissionsFor(guild.roles.everyone)
                  .has("SEND_MESSAGES")
            );
          if (channel) {
            let newGuild = new Discord.MessageEmbed()
              .setTitle(`Thank you for adding me!`)
              .setDescription(
                `Howdy! I'm Drago, Drago the Dragon! Hmm... you're new to Drago's moderation, aren'tcha? Golly, you must be so excited. Someone ought to teach you how things work around here. I guess little old me will have to do!`
              )
              // .setURL(`${sails.config.custom.baseURL}/setup`)
              .addField(
                `Getting Started`,
                `To get started setting me up, click the title link to read the getting started guide!`
              )
              .addField(
                `Commands / Prefix`,
                `* My default prefix is **${settings.defaultPrefix}**. You can change it with **${settings.defaultPrefix}prefix**. `
              )
              .setColor(`#8800FF`)
              // .setThumbnail(
              //   `${sails.config.custom.baseURL}/images/setup/welcome.png`
              // )
              .setTimestamp();
                channel.send(newGuild);
                console.log("Created The GuildConfig Database Data for a new Server that invited the bot while it was offline")
            }
        }else{
            console.log("The createGuildsSettings() function was called, but they \"GuildSettings\" is already created.")
        }
    })

    await AntiSpamConfig.findOne({ guildID: guild.id }, (err, res) => {
        if(err) return err;
        if(!res){
            const newGuild = new AntiSpamConfig({
                guildID: guild.id
            })
            newGuild.save(function(err){
                if(err){
                    console.log(err)
                }
            })
            console.log("Created Database Data for a new Server that invited the bot while it was offline")
        }else{
            console.log("The createGuildsSettings() function was called, but they \"AntiSpamConfig\" is already created.")
        }
    })

    await AntiRaidConfig.findOne({ guildID: guild.id }, (err, res) => {
        if(err) return err;
        if(!res){
            const newGuild = new AntiRaidConfig({
                guildID: guild.id
            })
            newGuild.save(function(err){
                if(err){
                    console.log(err)
                }
            })
            console.log("Created Database Data for a new Server that invited the bot while it was offline")
        }else{
            console.log("The createGuildsSettings() function was called, but they \"AntiRaidSettings\" is already created.")
        }
    })

    await RulesConfig.findOne({ guildID: guild.id }, (err, res) => {
        if(err) return err;
        if(!res){
            const newGuild = new RulesConfig({
                guildID: guild.id
            })
            newGuild.save(function(err){
                if(err){
                    console.log(err)
                }
            })
            console.log("Created Database Data for a new Server that invited the bot while it was offline")
        }else{
            console.log("The createGuildsSettings() function was called, but they \"RulesConfig\" is already created.")
        }
    })

    await ModerationConfig.findOne({ guildID: guild.id }, (err, res) => {
        if(err) return err;
        if(!res){
            const newGuild = new RulesConfig({
                guildID: guild.id
            })
            newGuild.save(function(err){
                if(err){
                    console.log(err)
                }
            })
            console.log("Created Database Data for a new Server that invited the bot while it was offline")
        }else{
            console.log("The createGuildsSettings() function was called, but they \"ModerationConfig\" is already created.")
        }
    })
}catch(err){
        throw new Error(`An Database Error has Occured! Please take a screenshot of this error and send it to \`PTB Drago#3787\`\n\n\`\`\`${err}\`\`\``)
    }
}

exports.getClientSettings = getClientSettings
