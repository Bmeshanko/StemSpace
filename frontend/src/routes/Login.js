import './Login.css';
import './Signup';
import './ForgotPassword';
import Sha1 from './Sha1.js';
import Profile from './Profile';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Routes, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";

function Login() {
    const [user, setUser] = useState({
        username: '',
        password: ''
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
    const navigate = useNavigate();
    function checkUserName() {
        axios.post("/getUsers", {
            username: user.username,
            password: user.password
        }).then(res => {
            if(res.data == null || res.data.password !== Sha1.hash(user.password)) {
                alert("Incorrect Username or Password")
            } else {
                navigate("/Profile", {state:{username:user.username}});
            }
            console.log(res.data.password)
        }).catch(function (error) {
            console.log("Error Detected")
        })
    }

    function handleClick(event) {
        checkUserName()
    }

    return (
     <body>
      <section className="Login-left">
          <img src="Big_logo.png" className="Login-logo" alt="STEM"/>
          <p className= "Login-welcome">
          <b>StemSpace</b>
          <p className="description">Connect with peers in your field</p>
        </p>
      </section>
      <section className="Login-right">
        <form>
            <label for="username">
                <input onChange={handleChange} value={user.username} className="Login-username-field" type="text" id="username" name="username" placeholder="Username or Email" />
                <div className="space"></div>
            </label>
            <label for="password">
                <input onChange={handleChange} value={user.password} className="Login-password-field" type="password" id="password" name="password" placeholder="Password" />
                <div className="space"></div>
            </label>
            <button className="Login-button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}><b>Log In</b>
            </button>
            <br></br>
            <Link to="/ForgotPassword" className="Forgot-password">
                Forgot Password?
            </Link>
            <div className="space"></div>
            <button className="Signup-button"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/Signup';
                }}><b>Create an Account</b>
            </button>
        </form>
      </section>
    </body>
    );
}

export default Login;


