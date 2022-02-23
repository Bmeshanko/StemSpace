import './Login.css';
import './Signup';
import './ForgotPassword';
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";



function Login() {

    const [input, setInput] = useState([])

    const [user, setUser] = useState({
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

    const getInput = () => {
        axios.get("/getUsers")
            .then((res) => {
                console.log(res.data);
                const myInput = res.data
                setInput(myInput)
            })
    }
    function handleClick(event) {
        getInput()
        console.log(input[0].username)
        setUser(prevState => {
            return {...prevState, username: input[0].username, password: input[0].password}
        })
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


