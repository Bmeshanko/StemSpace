import './EditProfile.css';
import Sha1 from './Sha1.js';
import React, {useState} from "react";
import axios from "axios";

function EditProfile() {

    const [input, setInput] = useState({
        firstname: '',
        lastname: '',
        bio: '',
        birthday: '',
        picture: ''
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
            username: input.username,
            password: Sha1.hash(input.password),
            email: input.email
        }
        if (input.confirmEmail === input.email && input.password === input.confirmPassword) {
            axios.post('/createUser', newUser).then(res => {
                if (res.data != null) {
                    console.log(res.data);
                }
            })
        } else {
            console.log("Error, confirm email/password must be equal.");
        }
    }

    return (
        <body>
        <header className="Edit-profile-header">
            <label for="firstname">
                <input onChange={handleChange} value={input.firstname} className="Edit-profile-first" type="text"
                       id="firstname" name="firstname"
                       placeholder="First Name"/>
            </label>
            <label for="lastname">
                <input onChange={handleChange} value={input.lastname} className="Edit-profile-last" type="text"
                       id="lastname" name="lastname"
                       placeholder="Last Name"/>
            </label>
            <div className="Edit-profile-space"></div>
            <textarea className="Biography" onChange={handleChange} value={input.bio} id="bio" name="bio" placeholder="Write about yourself...">
            </textarea>
            <p className="topic-text">Birthday: </p>
            <input className="Edit-profile-birthday" type="date" id="birthday" name="birthday" value={input.birthday}/>
            <div className="space"></div>
            <p className="topic-text">Profile Picture:</p>

            <label className="Edit-profile-picture">
                <input type="file" id="picture" value={input.picture}/>
                <b className="Edit-profile-upload">Upload Here</b>
            </label>
            <div className="space"></div>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        window.location.href = '/Profile';
                    }}><b>Submit Changes</b>
            </button>

        </header>
        </body>
    );
}
export default EditProfile;