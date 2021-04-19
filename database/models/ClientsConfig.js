const mongoose = require("mongoose")
const ClientsConfig = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    blacklisted: {
        type: Array,
        required: true
    },

    maintenanceMode: {
        type: Boolean,
        default: false
    },

})

module.exports = mongoose.model("ClientsConfig", ClientsConfig)