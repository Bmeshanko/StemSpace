import './Signup.css';
import Sha1 from './Sha1.js';
import React, {useState} from "react";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";

function Signup() {

    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmEmail: '',
        confirmPassword: ''
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput=> {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event) {
        const newUser = {
            username: input.username,
            password: Sha1.hash(input.password),
            email: input.email
        }
        if (input.confirmEmail === input.email && input.password === input.confirmPassword) {
            axios.post('/createUser', newUser).then(res => {
                if (res.data != null) {
                    console.log(res.data);
                    window.location.href = '/Login';
                }
            })
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
                    <input onChange={handleChange} value={input.username} className="Signup-username-field" type="text" id="username" name="username"
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
        </body>
    );
}
export default Signup