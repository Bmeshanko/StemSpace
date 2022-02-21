import './Signup.css';
import React, {useState} from "react";
import axios from "axios";

function Signup() {

    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
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
            username: input.name,
            password: input.password,
            email: input.email
        }
        axios.post('http://localhost:5000/createUser', newUser);
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
                <label for="confirm-email">
                    <input onChange={handleChange} className="Signup-confirm-email-field" type="text" id="confirm-email" name="confirm-email"
                           placeholder="Confirm Email"/>
                </label>
                <div className="space"></div>
                <label htmlFor="password">
                    <input onChange={handleChange} value={input.password} className="Signup-password-field" type="password" id="password" name="password"
                           placeholder="Password"/>
                </label>
                <div className="space"></div>
                <label htmlFor="confirm-password">
                    <input onChange={handleChange} className="Signup-confirm-password-field" type="password" id="confirm-password"
                           name="confirm-password"
                           placeholder="Confirm Password"/>
                </label>
                <div className="space"></div>
                <button className="Signup-button2"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick();
                            //window.location.href='/Login';
                        }}><b>Sign Up</b>
                </button>
            </header>
        </body>
    );
}
export default Signup