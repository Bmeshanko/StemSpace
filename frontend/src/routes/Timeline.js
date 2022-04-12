import './Timeline.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Timeline() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState({
        username: location.state.username,
        posts: []
    })

    function handleClickPost(event) {
        navigate("/CreatePost", {state:{username:input.username}});
    }

    function handleClickNotification(event) {
        navigate(`/Profile/${input.username}`, {state:{username:input.username}});
    }

    function handleClickLogo(event) {
        navigate("/Timeline", {state:{username:input.username}});
    }

    function handleClickName(event, name) {
        navigate(`/Profile/${name}`, {state:{username:input.username}});
    }

    function deletePost(event,id) {
        axios.post("/deletePost", {
			id: id
		}).then (res => {
            //put in console all the posts
		}).catch(function (error) {
			console.log("Error Detected")
		})
    }
    function likePost(event, username, id){
        axios.post("/likePost", {
            username: username,
            id: id
        }).then( res => {
            //whatever
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    function unlikePost(event, username, id){
        axios.post("/unlikePost", {
            username: username,
            id: id
        }).then( res => {
            //whatever
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    function arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};
    
    //function getPosts(){
    useEffect(()=>{
        axios.post("/getPosts", {
			//criteria would go here
		}).then (res => {
            //put in console all the posts
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: res.data[i].author
                }).then (response=> {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(response.data.img.data.data);
                    let picture=base64Flag+imageStr;
                    temp[i] = {post:{author:res.data[i].author, contents:res.data[i].contents, topic:res.data[i].topic, id:res.data[i]._id, likers:res.data[i].likers, image: picture}};
                }))
            }
            Promise.all(promises).then(()=>setInput({username: location.state.username, posts: temp}));
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
                        <button className="Post" onClick={(event) => {;
                            handleClickName(event, post.post.author)}}>
                            @{post.post.author}
                        </button>
                        <img className='Post-picture' src={post.post.image}></img>
                        <p>Topic: {post.post.topic}</p>
                        <p>{post.post.contents}</p>

                        {post.post.likers.includes(input.username) && <button className="Like"
                                onClick={(e) => {
                                    unlikePost(e, input.username, post.post.id)
                                }}><b>{post.post.likers.length}|UNLIKE</b>
							</button>}
                        {!post.post.likers.includes(input.username) && <button className="Like"
                                onClick={(e) => {
                                    likePost(e, input.username, post.post.id)
                                }}><b>{post.post.likers.length}|LIKE</b>
                            </button>}
                            <div className="hide">{post.post.likers.map((liker)=>(
                                <button className="GreenButton" onClick={(event) => {;
                                    handleClickName(event, liker)}}>
                                   <b>@{liker}{"   "}</b> 
                                </button>
                            ))}</div>
                        {post.post.author===input.username && <button 
									onClick={(e) => {
										deletePost(e, post.post.id)
									}}><b>Delete Post</b>
							</button>}
                        </div>
                    ))}
                </ol>
                
            </span>
            <span class="Timeline-DMs">
                    <p className="DM-header">Chats</p>
            </span>
        </body>
    );
}

export default Timeline;
