const mongoose = require("mongoose");

const userSchema = {
    username: String,
    password: String,
    email: String,
    bio: String
}

const User = mongoose.model("User", userSchema);

module.exports = User;