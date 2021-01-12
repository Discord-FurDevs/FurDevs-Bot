const { MessageEmbed } = require("discord.js");
const { CronJob } = require("cron");

module.exports = async (client) => {
  await client.user.setPresence({
    activity: {
      name: "My Furry Friends",
      type: "WATCHING",
    },
  });
  console.log("==================================");

  var twoHours = new CronJob(
    "00 00 2,6,10,14,18,22 * * *",
    async function () {
      const guild = client.guilds.cache.get("731520035717251142");
      const setting = await guild.settings();
      const bumpingChannel = setting.bumpingChannel;
      const bumpEmbed = new MessageEmbed()
        .setAuthor(
          "Friendly Bump Reminder",
          `${client.user.displayAvatarURL()}`
        )
        .setTitle("Heyo all, It's time to Bump")
        .setURL("https://discord.me/dashboard")
        .addField("Discord.me", "https://discord.me/dashboard")
        .addField("Disboard", "`!d bump`")
        .addField(
          "Discordservers.com",
          "https://discordservers.me/servers/731520035717251142/upvote"
        )
        .addField(
          "Discord Server List ( Top.gg )",
          "https://top.gg/servers/731520035717251142/vote"
        )
        .addField("Server Monitoring", "`!bump`")
        .addField("DiscordServer", "`|bump`")
        .addField("DiscordList.io", "`dlm!bump`")
        .setColor("#8800FF")
        .setFooter(
          "Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done."
        );
        try{
          guild.channels.cache.get(bumpingChannel).send(bumpEmbed);
        }catch{
          console.log("Failed to send Bump message")
        }
    },
    null,
    true,
    "America/Chicago"
  );

  var fourHours = new CronJob(
    "00 00 4,8,12,16,20,0 * * *",
    async function () {
      const guild = client.guilds.cache.get("731520035717251142");
      const setting = await guild.settings();
      const bumpingChannel = setting.bumpingChannel;
      const bumpEmbed = new MessageEmbed()
        .setAuthor(
          "Friendly Bump Reminder",
          `${client.user.displayAvatarURL()}`
        )
        .setTitle("Heyo all, It's time to Bump")
        .setURL("https://discord.me/dashboard")
        .addField("Discord.me", "https://discord.me/dashboard")
        .addField("Disboard", "!d bump")
        .addField(
          "Discordservers.com",
          "https://discordservers.me/servers/731520035717251142/upvote"
        )
        .addField(
          "Discord Server List ( Top.gg )",
          "https://top.gg/servers/731520035717251142/vote"
        )
        .addField("Server Monitoring", "`!bump`")
        .addField("DiscordServer", "`|bump`")
        .addField("DiscordList.io", "`dlm!bump`")
        .setColor("#8800FF")
        .setFooter(
          "Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done."
        );
        try{
          guild.channels.cache.get(bumpingChannel).send(bumpEmbed);
        }catch{
          console.log("Failed to send Bump message")
        }
    },
    null,
    true,
    "America/Chicago"
  );

  // TODO: Make a Staff Only Channel for Discord.me Bumping Reminders
  // var discordme = new CronJob(
  //   "40 55 5,11,17,23 * * *",
  //   async function () {
  //     const guild = client.guilds.cache.get("731520035717251142");
  //     const setting = await guild.settings();
  //     const bumpingChannel = setting.bumpingChannel;
  //     const bumpEmbed = new MessageEmbed()
  //       .setAuthor(
  //         "Friendly Bump Reminder",
  //         `${client.user.displayAvatarURL()}`
  //       )
  //       .setTitle("Heyo all, It's time to Bump")
  //       .setURL("https://discord.me/dashboard")
        
  //       .setFooter(
  //         "Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done."
  //       );
  //       try{
  //         guild.channels.cache.get(bumpingChannel).send(bumpEmbed);
  //       }catch{
  //         console.log("Failed to send Bump message")
  //       }
  //   },
  //   null,
  //   true,
  //   "America/Chicago"
  // );

  twoHours.start();
  fourHours.start();
  // discordme.start();
  console.log(`${client.fdevsLog} Bump Reminders Started!`);
  console.log(`${client.fdevsLog} ${client.user.username} is Ready!`);
};
