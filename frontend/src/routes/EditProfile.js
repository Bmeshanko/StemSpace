import './EditProfile.css';
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
            navigate(`/Profile/${input.username}`, {state:{username:input.username}});
    	});
        
    }
    function onImageChange(event){
        if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			const size=event.target.files[0].size;
			if(size>18000)
			{
				alert("File too large, will not be saved!")
			}
			reader.onload = (e) => {
				axios.post("/editImage", {
					image: e.target.result,
					username: input.username
				}).then(res => {
                    navigate(`/Profile/${input.username}`, {state:{username:input.username}});
				})
			};
			reader.readAsDataURL(event.target.files[0]);
		}
    }

    return (
        <body>
        <header className="Edit-profile-header">
            <button className="Big-Green-Button">
					<label htmlFor="image"><b>Change Picture</b></label>
					<input type="file" onChange={onImageChange} id="image" name="image" value="" required/>
			</button>
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