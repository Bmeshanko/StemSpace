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

router.route("/getUsers").get( (req, res) => {
    const id = req.params.email;
    User.findById(id).exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })

})

/*router.post('/createUser', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }, {collection: 'users');
    newUser.save();
})
*/

User.find({email: 'testuser@gmail.com'}, function(err, users) {
    console.log(users)
})

module.exports = router;