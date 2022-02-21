const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.route("/createUser").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const newUser = new User({
        username,
        password,
        email
    })

    newUser.save();
})

module.exports = router;