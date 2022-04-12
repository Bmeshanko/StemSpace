const mongoose = require("mongoose");
const Post = require("./postModel");

const commentSchema = {
    Post: String,
    contents: String,
    author: String,
    likers: []
}

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;