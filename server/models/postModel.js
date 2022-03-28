const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const User = require("./userModel");

const postSchema = {
    contents: String,
    topic: String,
    author: String
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;