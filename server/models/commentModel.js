const mongoose = require("mongoose");
const Post = require("./postModel");

const commentSchema = {
    Post: Post,
    contents: String,
    author: String,
    likers: [String]
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;