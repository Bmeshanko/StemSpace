import './DeleteAccount.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import Sha1 from "./Sha1";

function DeleteAccount() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirm: ''
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setUser(prevUser=> {
            return {
                ...prevUser,
                [name]: value
            }
        })
    }

    function pressButton(e) {
        if (user.confirm == user.password) {
            axios.post("/deleteUser", {
                username: user.username,
                password: user.password
            }).then(res => {
                if (res.data == null || res.data.password !== Sha1.hash(user.password) || !res.data.verification) {
                    alert("Incorrect Username or Password")
                } else {
                    window.location.href='/';
                }
            }).catch(function (error) {
                console.log("Error Detected")
            })
        }
    }

    return (
        <body>
        <header className="Delete-account-header">
            <p className="Delete-account-text">
                Sorry to see you go. Enter your credentials to confirm deletion.
            </p>
            <label for="username">
                <input className="Delete-account-username-field"
                       type="text"
                       id="username"
                       name="username"
                       value={user.username}
                       onChange={handleChange}
                       placeholder="Username"/>
            </label>
            <div className="space"></div>
            <label for="password">
                <input className="Delete-account-password-field"
                       type="password"
                       id="password"
                       name="password"
                       value={user.password}
                       onChange={handleChange}
                       placeholder="Password"/>
            </label>
            <div className="space"></div>
            <label for="confirm">
                <input className="Delete-account-confirm-password-field"
                       type="password"
                       id="confirm"
                       name="confirm"
                       value={user.confirm}
                       onChange={handleChange}
                       placeholder="Confirm Password"/>
            </label>
            <div className="space"></div>
            <button className="Delete-account-button"
                    onClick={pressButton}
                    ><b>Delete Account</b>
            </button>
        </header>
        </body>
    );
}

export default DeleteAccount;


