import './Post.css';
import React, {Component, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Post() {
    
	const navigate = useNavigate();
	const location = useLocation();
    const {postid} = useParams();

    const [state, setState] = useState({
        post: postid,
        contents: '',
        author: '',
        topic: '',
        image: "",
        likers: [],
        likes: Number,
        comments: []
	});

    useEffect(() => {
		axios.post("/getPost", {
			id: postid
		}).then(res => {
			if (res.data == null) {
				alert("Post not Found")
			} else {
				setState(prevState => ({ ...prevState, contents: res.data.contents}));
				setState(prevState => ({...prevState, author: res.data.author}))
				setState(prevState => ({...prevState, topic: res.data.topic}))
                setState(prevState => ({...prevState, likers: res.data.likers}))
                setState(prevState => ({...prevState, likes: res.data.likers.length}))
                axios.post("/getUsers", {
                    username: res.data.author
                }).then (response=> {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(response.data.img.data.data);
                    let picture=base64Flag+imageStr;
				    setState(prevState => ({...prevState, image: picture}))
                })
                
			}
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [useParams(), state.likes])

    useEffect(() => {
		axios.post("/getComments", {
			id: postid
		}).then(res => {
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: res.data[i].author
                }).then (response=> {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(response.data.img.data.data);
                    let picture=base64Flag+imageStr;
                    temp[i] = {
						comment:{author:res.data[i].author, 
						contents:res.data[i].contents, 
						id:res.data[i]._id, 
						likers:res.data[i].likers, 
						image: picture}};
                }))
            }
            Promise.all(promises).then(()=>setState(prevState => ({...prevState, comments: temp})));
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [state.comments])

    function arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};

    function handleClickNotification(e, username) {
			navigate(`/Profile/${location.state.username}`, {state: {username: location.state.username}} );
	}

	function handleClickLogo(e, username) {
			navigate("/Timeline", {state: {username: location.state.username}});
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
            setState(prevState => ({...prevState, likes: state.likes+1}))
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    function unlikePost(event, username, id){
        axios.post("/unlikePost", {
            username: username,
            id: id
        }).then( res => {
            setState(prevState => ({...prevState, likes: state.likes-1}))
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

	function handleClickName(event, name) {
        navigate(`/Profile/${name}`, {state:{username:location.state.username}});
    }

    
    function deleteComment(event,id) {
        axios.post("/deleteComment", {
			id: id
		}).then (res => {
            //put in console all the posts
		}).catch(function (error) {
			console.log("Error Detected")
		})
    }
    function likeComment(event, username, id){
        axios.post("/likeComment", {
            username: username,
            id: id
        }).then( res => {
            //whatever
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    function unlikeComment(event, username, id){
        axios.post("/unlikeComment", {
            username: username,
            id: id
        }).then( res => {
            //whatever
        }).catch(function(error){
            console.log("Error Detected")
        })
    }

    return (
        <body>
            <div className="Banner">
                <button className="Timeline-logo-button"
                        onClick={(e) => {
                            handleClickLogo(e, location.state.username)
                        }}
                ><b><img className='Timeline-logo' src="/Logo_new.png" alt="STEM"></img></b>
                </button>

                <a className="Timeline-banner-text">StemSpace</a>

                <button className="Notification-button"
                        onClick={(e) => {
                            handleClickNotification(e)
                        }}
                ><b><img src="/Notification.png" className="Notification-logo" alt="Notification"/></b>
                </button>
            </div>
            <div className="Timeline-bar-horizontal"/>

            <div className="Post">

                <button className="Name" onClick={(event) => {;
                    handleClickName(event, state.author)}}>
                    @{state.author}
                    <img className='Post-picture' src={state.image}></img>
                </button>

                

                <p className="Topic">Topic: {state.topic}</p>

                <p>{state.contents}</p>

                {state.likers.includes(location.state.username) && <button className="Like"
                        onClick={(e) => {
                            unlikePost(e, location.state.username, postid)
                        }}><b>{state.likes}|UNLIKE</b>
                    </button>}

                {!state.likers.includes(location.state.username) && <button className="Like"
                        onClick={(e) => {
                            likePost(e, location.state.username, postid)
                        }}><b>{state.likes}|LIKE</b>
                    </button>}

                <div className="hide">{state.likers.map((liker)=>(
                    <button className="GreenButton" onClick={(event) => {;
                        handleClickName(event, liker)}}>
                        <b>@{liker}{"   "}</b> 
                    </button>							
                ))}</div>

                {state.author===location.state.username && <button 
                        onClick={(e) => {
                            deletePost(e, postid)
                        }}><b>Delete Post</b>
                </button>}
            </div>

            <header class="Posts">
                <ol>
                    {state.comments.map((comment)=>(
                        <div className="Post">
                        <button className="Post" onClick={(event) => {;
                            handleClickName(event, comment.comment.author)}}>
                            @{comment.comment.author}
                        </button>
                        <img className='Post-picture' src={comment.comment.image}></img>
                        <p>{comment.comment.contents}</p>

                        {comment.comment.likers.includes(location.state.username) && <button className="Like"
                                onClick={(e) => {
                                    unlikeComment(e, location.state.username, comment.comment.id)
                                }}><b>{comment.comment.likers.length}|UNLIKE</b>
							</button>}
                        {!comment.comment.likers.includes(location.state.username) && <button className="Like"
                                onClick={(e) => {
                                    likeComment(e, location.state.username, comment.comment.id)
                                }}><b>{comment.comment.likers.length}|LIKE</b>
                            </button>}
                            <div className="hide">{comment.comment.likers.map((liker)=>(
                                <button className="GreenButton" onClick={(event) => {;
                                    handleClickName(event, liker)}}>
                                   <b>@{liker}{"   "}</b> 
                                </button>							
                            ))}</div>
						 {comment.comment.author===location.state.username && <button 
									onClick={(e) => {
										deleteComment(e, comment.comment.id)
									}}><b>Delete Comment</b>
							</button>}
                        </div>
                    ))}
                </ol>
                
            </header>

        </body>

        );

}

export default Post;