const mongoose = require("mongoose")
const moment = require('moment')

const MembersConfig = new mongoose.Schema({
  guildID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },

  XP: {
    type: Number,
    default: 0
  },

  bankCoins: {
    type: Number,
    default: 0,
  },

  coins: {
    type: Number,
    default: 0,
  },

  reps: {
    type: Number,
    default: 0,
  },

  level: {
    type: Number,
    default: 0,
  },

  roles: {
    type: Array,
    default: []
  },
  muted: {
    type: Boolean,
    default: false
  },

  notes: {
    type: Array,
    default: []
  },
})

module.exports = mongoose.model("MembersConfig", MembersConfig)