import './Signup.css';
import React, {useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";


function Code() {

    const location = useLocation();
    console.log(location.state.email)

    const [input, setInput] = useState({
        code: ""
    })

    function handleClick(event) {
        const newUser = {
            code: input.code,
            email: location.state.email
        }
            axios.post('/emailVerification', newUser).then(res => {
                console.log(newUser);
                if (res.data != null) {
                    console.log(res.data);
                    window.location.href = '/Login';
                } else {
                    console.log("incorrect code")
                }
            })
        }

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput=> {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    return (
        <body>
        <header className="Signup-header">
            <p className="Signup-text">Enter Code</p>
            <label for="Code">
                <input onChange={handleChange} value={input.code} className="Signup-username-field" type="text" id="code" name="code"
                       placeholder="Code"/>
            </label>
            <div className="space"></div>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}><b>Input Code</b>
            </button>
        </header>
        </body>
    );
}
export default Code