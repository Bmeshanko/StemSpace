import './Profile.css';
import React, {Component, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
function Profile() {
	const navigate = useNavigate();
	const location = useLocation();
	let followbutton;
	const FOLLOWERS = Symbol("followers");
	const FOLLOWING = Symbol("following");
	if(location.state == null || location.state == "") {
		followbutton = false;
		location.state = "";
	} else {
		followbutton = true;
	}
	const {userid} = useParams();
	const [state, setState] = useState({
		username: userid,
		bio: '',
		image: "",
		following: false,
		followers: 0,
		following_number: 0,
		posts: []
	});

	useEffect(() => {
		axios.post("/getUsers", {
			username: userid
		}).then(res => {
			if (res.data == null) {
				alert("Profile not Found")
			} else {
				setState(prevState => ({ ...prevState, bio: res.data.bio}));
				let base64Flag = 'data:image/jpeg;base64,';
				let imageStr = arrayBufferToBase64(res.data.img.data.data);
				setState( prevState => ({ ...prevState, image: base64Flag + imageStr}));
				setState(prevState => ({ ...prevState,following:res.data.followers.includes(location.state.username)}));
				setState(prevState => ({...prevState, followers: res.data.followers.length}))
				setState(prevState => ({...prevState, following_number: res.data.following.length}))
			}
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [useParams()])

	useEffect(() => {
		axios.post("/getPostsFromUser", {
			username: userid
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
                    temp[i] = {
						post:{author:res.data[i].author, 
						contents:res.data[i].contents, 
						topic:res.data[i].topic, 
						id:res.data[i]._id, 
						likers:res.data[i].likers, 
						image: picture}};
                }))
            }
            Promise.all(promises).then(()=>setState(prevState => ({...prevState, posts: temp})));
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [state.posts])

	function onImageChange(event){
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			const size=event.target.files[0].size;
			if(size>18000)
			{
				alert("File too large, will not be saved!")
			}
			reader.onload = (e) => {
				setState(prevState => ({ ...prevState, image: e.target.result}));
				axios.post("/editImage", {
					image: e.target.result,
					username: state.username
				}).then(res => {
				})
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	function arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};

	function handleClickPost(e, username) {
		if (!followbutton) {
			navigate("/Front");
		} else {
			navigate("/CreatePost", {state: {username: location.state.username}});
		}
	}


	function handleClickNotification(e, username) {
		if (!followbutton) {
			navigate("/Front");
		} else {
			navigate("/DeleteAccount");
		}
	}

	function handleClickLogo(e, username) {
		if (!followbutton) {
			navigate("/Front");
		} else {
			navigate("/Timeline", {state: {username: location.state.username}});
		}
	}

	function handleClickEdit(e, username) {
			navigate("/EditProfile", {state: {username: location.state.username}});
	}

	function handleCLickLogout(e) {
		navigate("/");
	}

	function handleClickFollow(){
		axios.post("/follow",{
			user: location.state.username,
			followed_user: userid
		}).then(res =>{
			setState(prevState => ({ ...prevState,following:true}));
			setState(prevState => ({...prevState, followers: state.followers+1}))
			// axios.post("/getUsers", {
			// 	username: userid
			// }).then(res => {
			// 	if (res.data == null) {
			// 		alert("Profile not Found")
			// 	} else {
			// 		setState(prevState => ({ ...prevState,following:res.data.followers.includes(location.state.username)}));
			// 		setState(prevState => ({...prevState, followers: res.data.followers.length}))
			// 	}
			// }).catch(function (error) {
			// 	console.log("Error Detected")
			// })
		})
	}

	function handleClickUnfollow(){
		axios.post("/Unfollow",{
			user: location.state.username,
			followed_user: userid
		}).then(res =>{
			// axios.post("/getUsers", {
			// 	username: userid
			// }).then(res => {
			// 	if (res.data == null) {
			// 		alert("Profile not Found")
			// 	} else {
			// 		setState(prevState => ({ ...prevState,following:res.data.followers.includes(location.state.username)}));
			// 	}
			// }).catch(function (error) {
			// 	console.log("Error Detected")
			// })
			setState(prevState => ({ ...prevState,following:false}));
			setState(prevState => ({...prevState, followers: state.followers-1}))
		})
	}

	function handClickShowFollowers(parameter){
		if(parameter === FOLLOWERS) {
			navigate(`/Followers/${userid}`, {state: {username:location.state.username, view: "followers"}});
		} else {
			navigate(`/Followers/${userid}`, {state: {username: location.state.username, view: "following"}});
		}
	}

	function FollowButton(){
		if(location.state.username !== userid && followbutton) {
			if(state.following == false) {
				return (
					<button className="Edit-profile-button" onClick={(e) => {
						handleClickFollow()}} >
						<b>Follow</b>
					</button>
				);
			} else {
				return (
					<button className="Edit-profile-button"
							onClick={(e) => {
								handleClickUnfollow()}}>
						<b>Unfollow</b>
					</button>
				);
			}
			}
		return(
			<p></p>
		)
	}

		function UserPermissionsEditProfile() {
			if(userid == location.state.username) {
				return(<button className="Edit-profile-button"
						onClick={(e) => {
							handleClickEdit(e, state.username)
						}}><b>Edit Profile</b>
				</button>)
			}
			return (<p></p>)
		}

	function UserPermissionsLogout() {
		if(userid == location.state.username) {
			return(	<button className="Edit-profile-button" onClick={(e) => {
				handleCLickLogout(e)
			}}><b>Log Out</b>
			</button>)
		}
		return (<p></p>)
	}

	function UserPermissionsProfilePic() {
		if(userid == location.state.username) {
			return(	<button className="Profile-Picture-Button">
					<label htmlFor="image"><b>Change Picture</b></label>
					<input type="file" onChange={onImageChange} id="image" name="image" value="" required/>
			</button>
			)
		}
		return (<p></p>)
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

	function handleClickName(event, name) {
        navigate(`/Profile/${name}`, {state:{username:location.state.username}});
    }

		return (
			<body>
			<div className="Banner">
				<button className="Timeline-logo-button"
						onClick={(e) => {
							handleClickLogo(e, state.username)
						}}
				><b><img className='Timeline-logo' src="/Logo_new.png" alt="STEM"></img></b>
				</button>

				<a className="Timeline-banner-text">StemSpace</a>
				<button className="Notification-button"
						onClick={(e) => {
							handleClickPost(e, state.username)
						}}
				><b><img src="/post_button.png" className="Notification-logo" alt="Create-post"/></b>
				</button>
				<button className="Notification-button"
						onClick={(e) => {
							handleClickNotification(e)
						}}
				><b><img src="/Notification.png" className="Notification-logo" alt="Notification"/></b>
				</button>
			</div>
			<div className="Timeline-bar-horizontal"/>
			<header className="Profile-bio">
				<img className='Profile-picture' src={state.image}></img>
				<span className="Profile-info">
						<div>
							<UserPermissionsEditProfile />
							<UserPermissionsLogout />
							<UserPermissionsProfilePic />
							<h6>{state.followers} <button onClick={(e)=>{handClickShowFollowers(FOLLOWERS)}}>followers</button></h6>
                       		<h6>{state.following_number} <button onClick={(e)=>{handClickShowFollowers(FOLLOWING)}}>following</button></h6>
							<p className="username">@{userid}</p>
							<p>{state.bio}</p>
							<FollowButton />
						</div>

             		</span>

			</header>
			<header class="Posts">
                <ol>
                    {state.posts.map((post)=>(
                        <div className="Post">
                        <button className="Post" onClick={(event) => {;
                            handleClickName(event, post.post.author)}}>
                            @{post.post.author}
                        </button>
                        <img className='Post-picture' src={post.post.image}></img>
                        <p>Topic: {post.post.topic}</p>
                        <p>{post.post.contents}</p>

                        {post.post.likers.includes(location.state.username) && <button className="Like"
                                onClick={(e) => {
                                    unlikePost(e, location.state.username, post.post.id)
                                }}><b>{post.post.likers.length}|UNLIKE</b>
							</button>}
                        {!post.post.likers.includes(location.state.username) && <button className="Like"
                                onClick={(e) => {
                                    likePost(e, location.state.username, post.post.id)
                                }}><b>{post.post.likers.length}|LIKE</b>
                            </button>}
                            <div className="hide">{post.post.likers.map((liker)=>(
                                <button className="GreenButton" onClick={(event) => {;
                                    handleClickName(event, liker)}}>
                                   <b>@{liker}{"   "}</b> 
                                </button>							
                            ))}</div>
						 {post.post.author===location.state.username && <button 
									onClick={(e) => {
										deletePost(e, post.post.id)
									}}><b>Delete Post</b>
							</button>}
                        </div>
                    ))}
                </ol>
                
            </header>
			</body>
		);
}
export default Profile;