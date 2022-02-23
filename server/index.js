const nodemailer = require('nodemailer');
const express = require('express')
const app = express();
let PORT = process.env.PORT || 5000


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

const mailConfigurations = {
    from: 'stemspacecompany@gmail.com',
    to: 'dutta36@purdue.edu',
    subject: 'Sending Email using Node.js',
    text: 'Hi! I just wanted to let you know Zach is cooler. .'
};

transporter.sendMail(mailConfigurations, function(err, info){
    if (err) throw Error(err);
    console.log('Email Sent Successfully');
});