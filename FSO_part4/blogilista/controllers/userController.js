const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_helper = require("../utils/user_helper");
const {UsernameExistsOrMissing} = require("../utils/appErrors");
const salt = 10;


const registerUser = async (user) => {
    

    if (!user.username || await user_helper.alreadyExists(user.username)) throw new UsernameExistsOrMissing();
    user.passwordHash = await bcrypt.hash(user.password, salt);
    delete user.password;
    user.blogs = [];
    const newUser = new User(user);
    await newUser.save();
    return newUser;
}




module.exports = {registerUser};