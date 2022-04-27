import './Signup.css';
import Sha1 from './Sha1.js';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup() {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmEmail: '',
        confirmPassword: '',
        usernameUsed: false,
        emailUsed: false,
        users: [],
        emails: []
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput=> {
            return {
                ...prevInput,
                [name]: value
            }
        })
        
        setInput(prevState => ({ ...prevState, usernameUsed: false}))
        setInput(prevState => ({ ...prevState, emailUsed: false}))  
        console.log(input.emails)     
        console.log(input.email)
        console.log(input.emails.includes(input.email))
    }

    useEffect(()=>{
        axios.post("/getAllUsers", {
		}).then (res => {
            input.users = [];
            input.emails = [];
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].verification){
                    input.users.push(res.data[i].username);
                    input.emails.push(res.data[i].email);
                }
            }
            setInput(prevState => ({ ...prevState, users: input.users}));
            setInput(prevState => ({ ...prevState, emails: input.emails}));

		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[]);

    function handleClick(event) {
        const newUser = {
            username: input.username,
            password: Sha1.hash(input.password),
            email: input.email
        }
        if (input.confirmEmail === input.email && input.password === input.confirmPassword) {
            if(!input.users.includes(input.username) && !input.emails.includes(input.email)){
                axios.post('/createUser', newUser).then(res => {
                    console.log(res.data);
                    if (res.data == "Success!") {
                        navigate("/Code", {state:{email:input.email}}).then(window.location.href = '/Code');
                    } else {
                        console.log(res.data)
                    }
                })
            } else{
                if(input.users.includes(input.username)){
                    setInput(prevState => ({ ...prevState, usernameUsed: true}))
                } 
                if(input.emails.includes(input.email)){
                    setInput(prevState => ({ ...prevState, emailUsed: true}))
                }
            }

        } else {
            console.log("Error, confirm email/password must be equal.");
        }
    }

    return (
        <body>
            <header className="Signup-header">
                <p className="Signup-text">Create an account on StemSpace today and join others
                    engaging with peers in their fields.</p>
                <label for="username">
                    <input onChange={handleChange} maxlength="20" value={input.username} className="Signup-username-field" type="text" id="username" name="username"
                           placeholder="Username"/>
                </label>
                <div className="space"></div>
                <label for="email">
                    <input onChange={handleChange} value={input.email} className="Signup-email-field" type="text" id="email" name="email"
                           placeholder="Email Address"/>
                </label>
                <div className="space"></div>
                <label for="confirmEmail">
                    <input onChange={handleChange} value={input.confirmEmail} className="Signup-confirm-email-field" type="text" id="confirm-email" name="confirmEmail"
                           placeholder="Confirm Email"/>
                </label>
                <div className="space"></div>
                <label htmlFor="password">
                    <input onChange={handleChange} value={input.password} className="Signup-password-field" type="password" id="password" name="password"
                           placeholder="Password"/>
                </label>
                <div className="space"></div>
                <label htmlFor="confirmPassword">
                    <input onChange={handleChange} value={input.confirmPassword} className="Signup-confirm-password-field" type="password" id="confirmPassword"
                           name="confirmPassword"
                           placeholder="Confirm Password"/>
                </label>
                <div className="space"></div>
                <button className="Signup-button2"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick();
                        }}><b>Sign Up</b>
                </button>
            </header>

            {input.usernameUsed && <p className="Signup-text">
                "That username is taken!"
                </p>}

            {input.emailUsed && <p className="Signup-text">
                "That email already has an account."
                </p>}
        </body>
    );
}
export default Signup