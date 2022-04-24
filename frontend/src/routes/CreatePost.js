import './CreatePost.css';
import React, {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        topic: '',
        contents: '',
        username: location.state.username
    });

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
        axios.post("/createPost", {
            contents: input.contents,
            topic: input.topic,
            username: input.username,
            anon: false
        });
        navigate("/Timeline", {state:{username:input.username}})
    }

    function anonPost(event) {
        axios.post("/createPost", {
            contents: input.contents,
            topic: input.topic,
            username: input.username,
            anon: true
        });
        navigate("/Timeline", {state:{username:input.username}})
    }

    return (
        <body>
        <header className="Create-post-header">
            <p className="Create-post-text">Create Post:</p>
            <textarea onChange={handleChange} maxlength="500" value={input.contents} id="contents" name="contents" placeholder="Write something..">
            </textarea>
            <div className="space"></div>
            <label for="topic"><p className="topic-text">Topic: </p> </label>
            <select className="topic" name="topic" id="topic" value={input.topic} onChange={handleChange}>
                <option value="Art">Art</option>
                <option value="Biology">Biology</option>
                <option value="Blogs">Blogs</option>
                <option value="ComSci">ComSci</option>
                <option value="Earth">Earth</option>
                <option value="Engineering">Engineering</option>
                <option value="Fitness">Fitness</option>
                <option value="Funny">Funny</option>
                <option value="Gaming">Gaming</option>
                <option value="Health">Health</option>
                <option value="Math">Math</option>
                <option value="Music">Music</option>
                <option value="Psychology">Psychology</option>
                <option value="Sports">Sports</option>
            </select>
            <div className="space"></div>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}><b>Submit Post</b>
            </button>
            <p></p>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        anonPost();
                    }}><b>Submit Post Anonymously</b>
            </button>
        </header>
        </body>
    );
}

export default CreatePost;