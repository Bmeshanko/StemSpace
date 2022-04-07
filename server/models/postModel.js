const mongoose = require("mongoose");

const postSchema = {
    contents: String,
    topic: String,
    author: String,
    likers: [String]
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;