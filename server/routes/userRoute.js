const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const assert = require("assert");
const sendMail = require('../mail.js');


router.post("/createUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log("heyy plz")
    const newUser = new User({
        username,
        password,
        email
    });

    newUser.save();
    res.end()
})


/*router.route("/getUsers").post((req, res) => {
    User.find()
        .then(foundUsers => res.json(foundUsers));
})
*/

router.post("/getUsers", (req, res) => {
    try {
        const request = req.body.username
        console.log(req.body.username)
        let criteria = (request.indexOf('@') === -1) ? {username: request} : {email: request};
    const user = User.findOne(criteria, function(err, users) {
        console.log(users)
        res.json(users)
    }, {collection: 'users'})
    }catch(e) {
        console.log("well shit")
        }
});


/*router.post('/createUser', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }, {collection: 'users');
    newUser.save();
})
*/


router.post("/forgotPassword", (req, res) => {
    try {
        const request = req.body.email
        console.log(request)
     const user = User.findOne({email: request}, function (err, info) {
         if(info == null) {
             res.json(null)
         } else {
             sendMail(info.email, info.password)
             res.end()
         }
        }, {collection: 'users'})
    } catch (e) {
        console.log("well ")
    }
})



module.exports = router;
