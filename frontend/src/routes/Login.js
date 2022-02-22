import './Login.css';
import './Signup';
import './ForgotPassword';
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";

function Login() {

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
                <input className="Login-username-field" type="text" id="username" name="username" placeholder="Username or Email" />
                <div className="space"></div>
            </label>
            <label for="password">
                <input className="Login-password-field" type="password" id="password" name="password" placeholder="Password" />
                <div className="space"></div>
            </label>
            <button className="Login-button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/Timeline';
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


