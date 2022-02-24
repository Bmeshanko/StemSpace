const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const assert = require("assert");




router.route("/createUser").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    const newUser = new User({
        username,
        password,
        email
    });

    newUser.save();
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
    const user = User.findOne({username: request}, function(err, users) {
        console.log(users)
        res.json(users)
    })
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





module.exports = router;