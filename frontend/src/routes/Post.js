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
        username: location.state.username,
        topic: '',
        image: "",
        likers: [],
        likes: Number,
        comments: []
	});

    const [input, setInput] = useState({
        comment: '',
        username: location.state.username,
        post: postid
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
		axios.post("/getPost", {
			id: postid
		}).then(res => {
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.comments.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: res.data.comments[i].author
                }).then (response=> {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(response.data.img.data.data);
                    let picture=base64Flag+imageStr;
                    temp[i] = {comment:
                        {author:res.data.comments[i].author, 
                        contents:res.data.comments[i].contents, 
                        likers:res.data.comments[i].likers, 
                        image: picture}};
                }))
            }
            Promise.all(promises).then(()=>setState(prevState => ({ ...prevState, comments: temp})));
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

    function handleLike(event, username, id){
        axios.post("/getPost", {
            id: id
        }).then( res => {
            if (res.data.likers.includes(username)){
                unlikePost(event, username, id)
            } else {
                likePost(event, username, id)
            }           
        }).catch(function(error){
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

    function handleComment(comment, author, post) {
        axios.post("/createComment", {
            author: author,
            contents: comment,
            postid: post
        }).catch(function(error) {
            console.log("Error Detected!")
        })
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

    function handleLikeComment(event, username, id){
        axios.post("/getComment", {
            id: id
        }).then( res => {
            if(res.data.likers.includes(username)){
				unlikeComment(event, username, id);
			} else{
				likeComment(event, username, id);
			}
        }).catch(function(error){
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
        <body className="Ignore-X-Overflow">
            <div className="Post-Top-Banner">
                <button className="Post-Logo-Button"
                    onClick={(e) => {
                        handleClickLogo(e, location.state.username)
                    }}>
                        
                    <img className="Post-Logo-Image" src="/Logo_new.png" alt="STEM"></img>
                </button>

                <a className="Post-Banner-Text">StemSpace</a>

                <button className="Post-Banner-Button"
                    onClick={(e) => {
                        handleClickNotification(e)
                    }}>

                    <img src="/Notification.png" className="Post-Banner-Button" alt="Notification"/>
                </button>
            </div>

            <div className="Post-Horizontal-Bar"/>
            <div className="Post-Post-Wrapper">
                <button className="Post-Post-Name" 
                    onClick={(event) => {;
                        handleClickName(event, state.author)
                    }}>

                    <img className='Post-Post-PFP' src={state.image}></img>
                    @{state.author}
                </button>

                <p className="Post-Post-Topic">Topic: {state.topic? state.topic:"None"}</p>
                <p className="Post-Post-Content">{state.contents}</p>
                <button className="Post-Like-Button"
                        onClick={(e) => {
                            handleLike(e, location.state.username, postid)
                        }}>
                        <b>{state.likes}|{state.likers.includes(location.state.username)? "UNLIKE": "LIKE"}</b>
                </button>

                <div className="Post-Likers">{state.likers.map((liker)=>(
                    <button className="Post-Liker-Button" 
                        onClick={(event) => {;
                            handleClickName(event, liker)
                        }}>
                        <b>@{liker}</b> 
                    </button>							
                ))}</div>

                {state.author===location.state.username && 
                <button className="Post-Like-Button"
                    onClick={(e) => {
                        deletePost(e, postid)
                    }}>

                    <b>Delete Post</b>
                </button>}

                <button className="Post-Like-Button"
                        onClick={(e) => {
                            handleComment(input.comment, location.state.username, postid);
                        }}>
                    <b>Comment</b>
                </button>
                <textarea
                    className="Post-Comment-Field"
                    onChange={handleChange}
                    value={input.comment} id="comment" name="comment" placeholder="Write something..">
                </textarea>
            </div>

            <header class="Post-Comment-Wrapper">
                <ol>
                    {state.comments.map((comment)=>(
                        <div className="Post-Comment">
                            <button className="Post-Comment-Name" 
                                onClick={(event) => {
                                    handleClickName(event, comment.comment.author)
                                }}>

                                <img className='Post-Comment-PFP' src={comment.comment.image}></img>

                                @{comment.comment.author}
                            </button>
                            
                            <p>{comment.comment.contents}</p>

                            <button className="Like"
                                    onClick={(e) => {
                                        handleLikeComment(e, location.state.username, comment.comment.id)
                                    }}>

                                    <b>{comment.comment.likers.length}|{comment.comment.likers.includes(location.state.username)? "UNLIKE": "LIKE"}</b>
                            </button>

                            <div className="Post-Comment-Likers">
                                {comment.comment.likers.map((liker)=>(
                                    <button className="Post-Comment-Liker-Button" 
                                        onClick={(event) => {
                                            handleClickName(event, liker)}}>
                                        
                                        <b>@{liker}</b> 
                                    </button>							
                                ))}
                            </div>

                            {comment.comment.author===location.state.username && 
                            <button 
                                onClick={(e) => {
                                    deleteComment(e, comment.comment.id)
                                }}>
                                <b>Delete Comment</b>
                            </button>}
                        </div>
                    ))}
                </ol>
                
            </header>

        </body>

        );

}

export default Post;