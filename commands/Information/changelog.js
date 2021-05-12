const pjson = require("./../../package.json");
const changelogParser = require("changelog-parser");
const {
  MessageEmbed
} = require("discord.js")

exports.run = async (client, message, args) => {
  message.delete()
  changelogParser("CHANGELOG.md")
    .then(async (result) => {
      if (
        result.versions &&
        result.versions[0] &&
        result.versions[0].parsed
      ) {
        // Construct embed
        var changelog = new MessageEmbed()
          .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
          )
          .setFooter(`User ID: ${message.author.id}`)
          .setTitle(`Changelog - Current bot version is ${pjson.version}`)
          .setColor(`#8800FF`)
          .setTimestamp();

        // Only get the most recent changes on the changelog
        var version = result.versions[0];
        changelog.setDescription(
          `The following changelog is for version ${version.title}`
        );
        for (var key in version.parsed) {
          if (
            Object.prototype.hasOwnProperty.call(version.parsed, key) &&
            key !== "_"
          ) {
            changelog.addField(
              key,
              version.parsed[key].map((data) => `* ${data}`).join(`
              `)
            );
          }
        }

        // Send embed
        message.channel.send(changelog);
      } else {
        throw new Error(
          `The changelog is not formatted properly; header 2s must begin with the version number and must contain proper Added/Changed/Deprecated/Removed header 3s with lists.`
        );
      }
    })
    .catch(function (err) {
      // Whoops, something went wrong!
      throw err;
    });
};

exports.help = {
  name: "changelog",
  description: "Display Any changes that were made on the bot.",
  usage: "changelog",
  aliases: ["Changes"],
};