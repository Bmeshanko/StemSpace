const nodemailer = require('nodemailer');
const express = require('express')
const User = require("./models/userModel");
let PORT = process.env.PORT || 5000
const router = express.Router();
const mongoose = require("mongoose");
const assert = require("assert");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "stemspacecompany@gmail.com",
        pass: "StemSpace123"
    },
    tls: {
        rejectUnauthorized: false
    }
});


function sendMail(email, password) {

    const mailConfigurations = {
        from: 'stemspacecompany@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'The password for your account is ' + password + '.'
    };

    transporter.sendMail(mailConfigurations, function (err, info) {
        if (err) throw Error(err);
        console.log('Email Sent Successfully');
    });
}

module.exports = sendMail;