const mongoose = require("mongoose");

const userSchema = {
    username: String,
    password: String,
    email: String,
    bio: String,
    pic: Image
}

const User = mongoose.model("User", userSchema);

module.exports = User;