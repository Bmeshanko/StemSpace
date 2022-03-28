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
    img: { data: Buffer, contentType: String }
}

const User = mongoose.model("User", userSchema);

module.exports = User;