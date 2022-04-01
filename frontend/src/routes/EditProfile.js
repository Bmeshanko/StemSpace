import './EditProfile.css';
import Sha1 from './Sha1.js';
import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function EditProfile() {
    const location = useLocation();
    const [input, setInput] = useState({
        username: location.state.username,
        bio: ''
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

    const navigate = useNavigate();

    function handleClick(event) {
        axios.post("/editBio", {
        	bio: input.bio,
        	username: input.username
    	}).then(res => {
    	});
        navigate(`/Profile/${input.username}`, {state:{username:input.username}});
    }

    return (
        <body>
        <header className="Edit-profile-header">
            <div className="Edit-profile-space"></div>
            <textarea className="Biography" onChange={handleChange} value={input.bio} id="bio" name="bio" placeholder="Write about yourself...">
            </textarea>
            
            <div className="space"></div>
            <div className="space"></div>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }} type="submit"><b>Submit Changes</b>
            </button>
        </header>
        </body>
    );
}
export default EditProfile;