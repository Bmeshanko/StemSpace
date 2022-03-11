const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const User = require("./userModel");

const postSchema = {
    text: String,
    author: User,
    likes: Int32
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;