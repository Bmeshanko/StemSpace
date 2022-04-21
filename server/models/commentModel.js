const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const commentSchema = {
    Post: ObjectId,
    contents: String,
    author: String,
    likers: []
}

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;