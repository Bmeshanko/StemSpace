import './Timeline.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Timeline() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        username: location.state.username,
        posts: [],
        num_posts: 0
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

    function handleClickPost(event) {
        navigate("/CreatePost", {state:{username:input.username}});
    }

    function handleClickNotification(event) {
        navigate("/Profile", {state:{username:input.username}});
    }

    function handleClickLogo(event) {
        navigate("/Timeline", {state:{username:input.username}});
    }
    
    //function getPosts(){
    useEffect(()=>{

        axios.post("/getPosts", {
			//criteria would go here
		}).then (res => {
            //put in console all the posts
            input.num_posts = res.data.length;
            let temp=[];
            for(let i = 0; i < res.data.length; i++){
                temp[i] = {post:{author:res.data[i].author, contents:res.data[i].contents, topic:res.data[i].topic}};
            }
            setInput({username: location.state.username, posts: temp});

		}).catch(function (error) {
			console.log("Error Detected")
		})
    },[input.posts]);
    //}

    return(
        <body className="wrapper">
            <div className="Timeline-banner">
                <button className="Timeline-logo-button"
                        onClick={handleClickLogo}
                ><b><img className='Timeline-logo' src="Logo_new.png" alt="STEM"></img></b>
                </button>

                <a className="Timeline-banner-text">StemSpace</a>
                <button className="Notification-button"
                    onClick={handleClickPost}
                    ><b><img src="post_button.png" className="Notification-logo" alt="Create-post"/></b>
                </button>
                <button className="Notification-button"
                    onClick={handleClickNotification}
                    ><b><img src="Notification.png" className="Notification-logo" alt="Notification"/></b>
                </button>
            </div>
            <div className="Timeline-bar-horizontal"/>
            <header className="Timeline-selector">
                <p className="Timeline-following">Following</p>
                <div className="Timeline-bar-vertical"/>
                <p className="Timeline-topics">Topics</p>
            </header>
            <div className="Timeline-bar-horizontal"/>
            <header className="Direct-messages">

            </header>
            <span class="Timeline-posts">
                <ol>
                    {input.posts.map((post)=>(
                        <div className="Post">
                        <p className="Post"><strong>@{post.post.author}</strong></p>
                        <p>Topic: {post.post.topic}</p>
                        <p>{post.post.contents}</p>
                        </div>
                    ))}
                </ol>
                
            </span>
            <span class="Timeline-DMs">
                    <p className="DM-header">Chats</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici
                       a deserunt mollit anim id est laborum.</p>
            </span>
        </body>
    );
}

export default Timeline;
