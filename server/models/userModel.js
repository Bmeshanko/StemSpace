const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Post = require("./postModel");

const userSchema = {
    username: String,
    password: String,
    email: String,
    bio: String,
    posts: [Post],
    postCount: Int32,
    following: [User],
    followers: [User]
}

const User = mongoose.model("User", userSchema);

module.exports = User;