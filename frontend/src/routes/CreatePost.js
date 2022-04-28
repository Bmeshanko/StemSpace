import './CreatePost.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        topic: '',
        contents: '',
        username: location.state.username,
        defaultTopics: ["Art", 
        "Biology", 
        "Blogs", 
        "CompSci",
        "Earth",
        "Engineering",
        "Fitness",
        "Funny",
        "Gaming",
        "Health",
        "Math",
        "Music",
        "Psychology",
        "Sports"]
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
        if(input.contents.trim() !== ""){
            axios.post("/createPost", {
                contents: input.contents,
                topic: input.topic,
                username: input.username,
                anon: false
            });
            navigate("/Timeline", {state:{username:input.username}})
        }
    }

    function anonPost(event) {
        if(input.contents.trim() !== ""){
            axios.post("/createPost", {
                contents: input.contents,
                topic: input.topic,
                username: input.username,
                anon: true
            });
            navigate("/Timeline", {state:{username:input.username}})            
        }
    }

    useEffect(()=>{
        axios.post("/getPosts", {
			//criteria would go here
		}).then (res => {
            for(let i = 0; i < res.data.length; i++){
                if(!input.defaultTopics.includes(res.data[i].topic) && res.data[i].topic !== "" && res.data[i].topic !== "None"){
                    input.defaultTopics.push(res.data[i].topic);
                }
            }
		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[]);

    return (
        <body>
        <header className="Create-post-header">
            <p className="Create-post-text">Create Post:</p>
            <textarea onChange={handleChange} maxlength="500" value={input.contents} id="contents" name="contents" placeholder="Write something..">
            </textarea>
            <div className="space"></div>
            <label for="topic"><p className="topic-text">Topic: </p> </label>
            <input maxlength="20" list="topic-selection" id="topic" name="topic" value={input.topic} onChange={handleChange}/>
                        <datalist id="topic-selection">
                            {input.defaultTopics.map((topic) => <option value={topic}>{topic}</option>)}
                        </datalist>  
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