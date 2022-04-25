import './CreatePost.css';
import React, {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function CreateDM() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        content: '',
        target: '',
        author: location.state.username
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
        console.log(input.author);
        axios.post("/createDM", {
            target: input.target,
            author: input.author
        });
        navigate("/Timeline", {state:{username:input.author}})
    }

    return(
        <body>
        <header className="Create-post-header">
            <p className="Create-post-text">Create Message:</p>
            <textarea onChange={handleChange} maxlength="500" value={input.content} id="content" name="content" placeholder="Write something..">
            </textarea>
            <div className="space"></div>
            <p className="Create-post-text">Type Target:</p>
            <textarea onChange={handleChange} maxlength="500" value={input.target} id="target" name="target" placeholder="Write something..">
            </textarea>
            <div className="space"></div>
            <button className="Signup-button2"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}><b>Submit DM</b>
            </button>
        </header>
        </body>
    );
}

export default CreateDM;