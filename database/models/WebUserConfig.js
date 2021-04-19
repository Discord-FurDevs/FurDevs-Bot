const {
    Schema,
    model
} = require("mongoose");

const UserSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    tag: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
    },
});

module.exports = model("User", UserSchema);