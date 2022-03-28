const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const assert = require("assert");
const sendMail = require('../mail.js');
const { $where } = require("../models/userModel");
const { getSystemErrorMap } = require("util");
var fs = require('fs');
const path = require('path');
const Post = require("../models/postModel");

router.post("/createUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const bio = "Hello World!";
    const imgPath='./Blank-Profile.png';
    const newUser = new User({
        username,
        password,
        email,
        bio,
        img: { data: Buffer, contentType: String }
    });
    newUser.img.data=fs.readFileSync(path.resolve(__dirname,imgPath));
    newUser.img.contentType = "image/png";
    newUser.save();
    res.json(newUser)
});

router.post("/getUsers", (req, res) => {
    try {
        const request = req.body.username;
        let criteria = (request.indexOf('@') == -1) ? {username: request} : {email: request};
        const user = User.findOne(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'users'})
    } catch(e) {
        console.log("Error Detected");
    }
});

router.post("/changePassword", (req, res) => {
    var ObjectId = require("mongodb").ObjectId;
    console.log(req.body.password)
    const update = {password: req.body.password};
    const id = new ObjectId(req.body.id);
    let criteria = {_id: id};
    console.log(id);
    const user2 = User.findOneAndUpdate(criteria, update, function(err, users) {
        console.log(users)
        res.json(users)
    }, {collection: 'users'})
});

router.post("/forgotPassword", (req, res) => {
    try {
        const request = req.body.email;
        const code = Math.floor(1000 + Math.random() * 9000);
        console.log(code);
        const user = User.findOne({email: request}, function (err, info) {
            if (info == null) {
                res.json(null)
            } else {
                sendMail(info.email, code, info._id)
                res.json(code)
            }
        }, {collection: 'users'})
    } catch (e) {
        console.log(e);
    }
});

router.post("/editBio", (req, res) => {
    try {
        const newBio = req.body.bio;
        const username = req.body.username;
        let criteria = {username: username};
        let update = {bio: newBio};
        const user = User.findOneAndUpdate(criteria, update, function(err, users) {
            res.json(users)
        }, {collection: 'users'});
    } catch (e) {
        console.log(e);
    }
});

router.post("/deleteUser", (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        let criteria = {username: username, password: password};
        console.log(criteria);
        const user = User.findOneAndDelete(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'users'});
    } catch (e) {
        console.log(e);
    }
});

router.post("/createPost", (req, res) => {
    const author = req.body.username;
    console.log(author);

    const contents = req.body.contents;
    const topic = req.body.topic;
    const newPost = new Post({
        contents,
        topic,
        author
    });

    newPost.save();
});

router.post("/likePost", (req, res) => {
    const username = req.body.username;
    let criteria = {username: username};
    const user = User.findOne(criteria, function(err, users) {
        res.json(users)
    }, {collection: 'users'});

    const id = req.body.id;
    criteria = {_id: id};
    const post = Post.findOne(criteria, function(err, posts) {
        res.json(posts)
    }, {collection: 'posts'});

    const postInUser = user.posts.findOne(criteria);

    if (postInUsers != null && postInUsers == post) {
        
    }
});

module.exports = router;