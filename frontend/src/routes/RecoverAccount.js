import './RecoverAccount.css';
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function RecoverAccount() {

    const {id} = useParams();
    const queryString = '?' + id;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('id')


    const [password, setName] = useState('')


    function handleClick() {
        axios.post("/changePassword", {
            id: email,
            password: password
        }).then(res => {
            window.location.href='/Login'
        });

    }

    return (
        <body>
        <header className="Recover-account-header">
            <p className="Recover-account-text">
                Enter your new password and the code you received through email.
            </p>
            <label for="Recover-account-password">
                <input className="Recover-account-password-field"
                       type="password"
                       id="recover-account-password"
                       name="recover-account-password"
                       placeholder="New Password" />
                <div className="space"></div>
                <input
                    onChange={e => setName(e.target.value)}
                    className="Recover-account-confirm-password-field"
                       type="password"
                       id="recover-account-confirm-password"
                       name="recover-account-confirm-password"
                       placeholder="Confirm Password" />
                <div className="space"></div>
                <button className="Change-password-button"
                        onClick={(e) => {
                            handleClick()
                        }}><b>Change Password</b>
                </button>
            </label>
        </header>
        </body>
    );
}

export default RecoverAccount;


