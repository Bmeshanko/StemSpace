const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const assert = require("assert");
const sendMail = require('../mail.js');
const { $where } = require("../models/userModel");
const { getSystemErrorMap } = require("util");

router.post("/createUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const bio = "";
    const newUser = new User({
        username,
        password,
        email,
        bio
    });

    newUser.save();
});

router.post("/getUsers", (req, res) => {
    try {
        const usernameOrEmail = req.body.username; 
        // Called "username" but could also be email.
        let criteria = (request.indexOf('@') === -1) ? {username: request} : {email: request};
        const user = User.findOne(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'users'})
    } catch(e) {
        console.log("Error Detected");
    }
});

router.post("/forgotPassword", (req, res) => {
    try {
        const request = req.body.email;
        const user = User.findOne({email: request}, function (err, info) {
            if (info == null) {
                res.json(null)
            } else {
                sendMail(info.email, info.password)
                res.end()
            }
        }, {collection: 'users'})
    } catch (e) {
        console.log("Error Detected");
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
        const user = User.findOneAndDelete(criteria, function(err, users) {
            res.json(users)
        }, {collection: 'users'});
    } catch (e) {
        console.log(e);
    }
});

router.post("/createPost", (req, res) => {
    const username = req.body.username;
    let criteria = {username: username};
    const user = User.findOne(criteria, function(err, users) {
        res.json(users)
    }, {collection: 'users'});

    const text = req.body.text;
    const likes = 0;
    const newPost = new Post({
        text,
        Author,
        likes
    });

    newPost.save();
});

module.exports = router;