import './Login.css';
import './Signup';
import './ForgotPassword';
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";

function Login() {

    const [input, setInput] = useState({
        username: '',
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
        const user = {
            username: input.username,
            password: input.password
        }

        let response = {
            username: '',
            password: ''
        }

        response = axios.post('http://localhost:5000/getUsers', user);
        if (response.username == 'Benjamin628' && response.password != '') {
            window.location.href='/Timeline';
        }
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
                <input onChange={handleChange} value={input.username} className="Login-username-field" type="text" id="username" name="username" placeholder="Username or Email" />
                <div className="space"></div>
            </label>
            <label for="password">
                <input onChange={handleChange} value={input.password} className="Login-password-field" type="password" id="password" name="password" placeholder="Password" />
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


