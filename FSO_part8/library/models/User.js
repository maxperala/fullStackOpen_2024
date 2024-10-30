const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 4
    },
    favoriteGenre: {
        type: String,
        required: true
    },
    
})


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;