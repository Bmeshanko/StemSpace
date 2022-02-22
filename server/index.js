const nodemailer = require('nodemailer');
const express = require('express')
const app = express();
let PORT = process.env.PORT || 3000


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
    to: 'jepsubotro@vusra.com',
    subject: 'Sending Email using Node.js',
    text: 'Hi! There, You know I am using the NodeJS '
        + 'Code along with NodeMailer to send this email.'
};

transporter.sendMail(mailConfigurations, function(err, info){
    if (err) throw Error(err);
    console.log('Email Sent Successfully');
});