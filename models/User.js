const mongoose = require("mongoose");
const passportLocalMongooese = require("passport-local-mongoose");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        trim: true, 
        unique: true,
        lowercase: true,
        maxLength: 16,
    },
    role: String,
    registeredAt: {
        type: Date,
        default: Date.now,
    }
});


userSchema.plugin(passportLocalMongooese);

const User =  model("User", userSchema);
module.exports = User;