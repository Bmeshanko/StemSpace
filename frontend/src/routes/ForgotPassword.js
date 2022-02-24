import './ForgotPassword.css';
import axios from "axios";
import {useState} from "react";

function ForgotPassword() {

    const[email, setEmail] = useState([])


    function sendEmail() {
        axios.post("/forgotPassword", {
            email: email
        }).then(res => {
            console.log(res.data)
        }).catch(function (error) {
            console.log("welp fuck")
        })
    }

    return (
        <body>
            <header className="Forgot-password-header">
                <p className="Forgot-password-text">
                    Please enter the email address your account is registered under.
                </p>
                <label for="Forgot-password-email">
                <input className="Forgot-password-email-field"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       type="text"
                       id="forgot-password-email"
                       name="forgot-password-email"
                       placeholder="Email" />
                <div className="space"></div>
                <button className="Recover-account-button"
                        onClick={(e) => {
                            e.preventDefault();
                            sendEmail()
                            //window.location.href='/RecoverAccount';
                        }}><b>Recover Account</b>
                </button>
            </label>
            </header>
        </body>
    );
}

export default ForgotPassword;


