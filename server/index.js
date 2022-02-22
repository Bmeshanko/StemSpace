const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const {response} = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/', ()=>{
    resizeBy.send('welcome to it')
})

app.post('http://localhost:5000/createUser', (req, res)=>{

    let data =req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'hotmail',
        port:5000,
        auth:{
            user:"test23313@outlook.com",
            pass: "thisishard!"
        }
    });

    let mailOptions={
        from:"test23313@outlook.com",
        to: data.email,
        subject: "Hitscb"
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
            res.send(error)
        }
        else {
            res.send('success')
        }
    })

    smtpTransport.close;
})

const PORT = process.env.PORT||5000;
app.listen(PORT,()=> {
    console.log("server starting at port");
})