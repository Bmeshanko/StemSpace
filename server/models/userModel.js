const mongoose = require("mongoose");
const Post = require("./postModel");

const userSchema = {
    username: String,
    password: String,
    email: String,
    bio: String,
    posts: [Post],
    following: [User],
    followers: [User]
}

const User = mongoose.model("User", userSchema);

module.exports = User;