const mongoose = require("mongoose")
const GuildConfig = new mongoose.Schema({

  /*
    Guild Settings
  */
  guildID: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    required: true,
    default: ">"
  },

  disabledCommands: {
    type: Array,
    required: true,
  },

  bankerRole: {
    type: String,
    default: null,
  },

  verificationRole: {
    type: String,
    default: null,
  },

  verificationLogging: {
    type: String,
    default: null,
  },

  bumpingChannel: {
    type: String,
    default: null,
  },
  staffMembers: {
    type: Array,
    default: null,
  },
  welcomeMessage: {
    type: String,
    default: null
  },



  /*
    FEATURES
  */

  reputationSystem: {
    type: Boolean,
    default: false,
  },

  programmingChannels: {
    type: Array,
    default: [],
  },

  publicModLogs: {
    type: String,
    default: false,
  },

})

module.exports = mongoose.model("GuildConfig", GuildConfig)