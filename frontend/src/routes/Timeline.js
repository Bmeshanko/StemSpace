import './Timeline.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

function Timeline() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        username: location.state.username
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
        navigate(`/Profile/${input.username}`, {state:{username:input.username}});
    }

    function handleClickLogo(event) {
        navigate("/Timeline", {state:{username:input.username}});
    }

    function getPosts(){
        axios.post("/getPosts", {
			//criteria would go here
		}).then (res => {
            //put in console all the posts
            console.log(res.data);
            
            //res.data has all the posts
            //its an array of length res.data.length 
            //content accesseable by res.data[i].contents

		}).catch(function (error) {
			console.log("Error Detected")
		})
    }


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
                <p>
                </p>
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
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici
                       a deserunt mollit anim id est laborum.</p>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici
                       a deserunt mollit anim id est laborum.</p>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici
                       a deserunt mollit anim id est laborum.</p>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offici
                       a deserunt mollit anim id est laborum.</p>
                       var                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
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
