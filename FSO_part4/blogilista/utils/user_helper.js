const User = require("../models/user");

const alreadyExists = async (username) => {
    const users = await User.find({username});
    return users.length > 0 ? true : false;
}

module.exports = {alreadyExists};