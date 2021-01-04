const { MessageEmbed } = require("discord.js")
const { usernameResolver } = require("./../../utils/resolvers/channel")
const {
    checkPermission
} = require("./../../utils/permissions")
const GuildConfig = require('./../../database/models/GuildConfig')

exports.run = async (client, message, args) => {
    // Delete the original command message
    message.delete();
    // Checks if the Staff is an Administrator
    checkPermission(message, "ADMINISTRATOR")


};


exports.help = {
    name: "addprogrammingchannel",
    description: "Add programming channels into the the database.",
    usage: "< Mention | Channel ID >",
    aliases: [],
};