const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Post = require("./postModel");

const userSchema = {
    username: String,
    password: String,
    email: String,
    bio: String
}

const User = mongoose.model("User", userSchema);

module.exports = User;