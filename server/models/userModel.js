const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Post = require("./postModel");

var express = require('express');
var fs = require('fs');
const userSchema = {
    username: String,
    password: String,
    email: String,
    bio: String,
    img: { data: Buffer, contentType: String },
    code: String,
    verification: Boolean,
    following: Array,
    followers: Array,
    blocking: Array,
    blockers: Array,
    topics: Array,
    expireAt: {
        type: Date,
        default: Date.now,
        expireAfterSeconds: 6000
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;