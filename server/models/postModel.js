const mongoose = require("mongoose");
const User = require("./userModel");

const postSchema = {
    text: String,
    author: User,
    likes: Integer
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;