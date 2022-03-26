import './CreatePost.css';
import React, {useState} from "react";
import axios from "axios";

function CreatePost() {

    const [input, setInput] = useState({
        topic: '',
        text: '',
        password: '',
        confirmEmail: '',
        confirmPassword: ''
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
        const newPost = {
            text: input.text,
            topic: input.topic
        }
    }

    return (
        <body>
        <header className="Create-post-header">
            <p className="Create-post-text">Create Post:</p>
            <textarea onChange={handleChange} value={input.text} id="text" name="text" placeholder="Write something..">
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
        </header>
        </body>
    );
}

export default CreatePost;