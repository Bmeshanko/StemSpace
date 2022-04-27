import './Profile.css';
import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
function Profile() {

	const navigate = useNavigate();
	const location = useLocation();

	let followbutton;
	let blockbutton;
	let loggedin = false;
	if(location.state === null || location.state === "") {
		loggedin = false;
		followbutton = false;
		location.state = "";
	} else {
		loggedin = true;
		followbutton = true;
		blockbutton = true;
	}

	const FOLLOWERS = Symbol("followers");
	const FOLLOWING = Symbol("following");

	const showedPosts = [];

	const {userid} = useParams();
	const [state, setState] = useState({
		username: userid,
		bio: '',
		image: "",
		following: false,
		blocking: false,
		blocked: false,
		followers: 0,
		following_number: 0,
		posts: [],
		likedposts: [],
		viewing: "Posts",
		exists: true
	});

	useEffect(() => {
		axios.post("/getUsers", {
			username: userid
		}).then(res => {
			if (res.data == null) {
				setState(prevState => ({ ...prevState, exists: false}));
			} else {
				setState(prevState => ({ ...prevState, bio: res.data.bio}));
				let base64Flag = 'data:image/jpeg;base64,';
				let imageStr = arrayBufferToBase64(res.data.img.data.data);
				setState( prevState => ({ ...prevState, image: base64Flag + imageStr}));
				setState(prevState => ({ ...prevState,following:res.data.followers.includes(location.state.username)}));
				setState(prevState => ({...prevState, followers: res.data.followers.length}))
				setState(prevState => ({...prevState, following_number: res.data.following.length}))
				setState(prevState => ({ ...prevState,blocking:res.data.blockers.includes(location.state.username)}));
				setState(prevState => ({ ...prevState,blocked:res.data.blocking.includes(location.state.username)}));
			}
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [userid])

	useEffect(() => {
		//console.log(state.blocked)
		axios.post("/getPostsFromUser", {
			username: userid
		}).then (res => {
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: res.data[i].author
                }).then (response=> {
					if(!res.data[i].anon){
						let base64Flag = 'data:image/jpeg;base64,';
						let imageStr = arrayBufferToBase64(response.data.img.data.data);
						let picture=base64Flag+imageStr;
						temp[i] = {
							post:{author:res.data[i].author, 
							anon: res.data[i].anon,
							contents:res.data[i].contents, 
							topic:res.data[i].topic, 
							id:res.data[i]._id, 
							likers:res.data[i].likers, 
							image: picture}};
					}
                    
                }))
            }
            Promise.all(promises).then(()=>setState(prevState => ({...prevState, posts: temp})));
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [state.posts])

	useEffect(() => {
		axios.post("/getLikedPosts", {
			username: userid
		}).then (res => {
            let temp=[];
            let promises=[];
            for(let i = 0; i < res.data.length; i++){
                promises.push(axios.post("/getUsers", {
                    username: res.data[i].author
                }).then (response=> {
					let base64Flag = 'data:image/jpeg;base64,';
					let imageStr = arrayBufferToBase64(response.data.img.data.data);
					let picture=base64Flag+imageStr;
					temp[i] = {post: {author: res.data[i].author,
						anon: res.data[i].anon,
						contents: res.data[i].contents,
						topic: res.data[i].topic,
						id: res.data[i]._id,
						likers: res.data[i].likers,
						image: picture}}; 
                }))
            }
            Promise.all(promises).then(()=>setState(prevState => ({...prevState, likedposts: temp})));
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [state.likedposts])

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
	function handleDMMode(e, mode) {
		//console.log(mode);
		axios.post("/changeDMMode", {
        	username: location.state.username,
			allowDM: mode
    	}).then(res => {
    	});
	}

	function handleClickLogo(e, username) {
		if (!followbutton) {
			navigate("/Front");
		} else {
			navigate("/Timeline", {state: {username: location.state.username}});
		}
	}

	function UserPermissionsEditProfile() {
		if(userid === location.state.username) {
			return(<button className="Big-Green-Button"
					onClick={(e) => {
						handleClickEdit(e, state.username)
					}}><b>Edit Profile</b>
			</button>)
		}
		return (<p></p>)
	}
	function UserPermissionsEditDM() {
		if(userid === location.state.username) {
			return(<div>
				<b>Select DM Mode</b>
				<button className="Big-Green-Button"
					onClick={(e) => {
						handleDMMode(e, "All")
					}}><b>ALL</b>
				</button>
				<button className="Big-Green-Button"
					onClick={(e) => {
						handleDMMode(e, "Followers")
					}}><b>FOLLOWERS</b>
				</button>
			</div>
			)
		}
		return (<p></p>)
	}

	function handleClickEdit(e, username) {
			navigate("/EditProfile", {state: {username: location.state.username}});
	}
	
	function UserPermissionsLogout() {
		if(userid === location.state.username) {
			return(	<button className="Big-Green-Button" onClick={(e) => {
				handleCLickLogout(e)
			}}><b>Log Out</b>
			</button>)
		}
		return (<p></p>)
	}

	function handleCLickLogout(e) {
		navigate("/");
	}

	function FollowButton(){
		if (location.state.username !== userid && followbutton) {
			if(state.following === false) {
				return (
					<button className="Edit-Profile-Button" onClick={(e) => {
						handleClickFollow()}} >
						<b>Follow</b>
					</button>
				);
			} else {
				return (
					<button className="Edit-Profile-Button"
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

	function BlockButton() {
		if (location.state.username !== userid && blockbutton) {
			if (state.blocking === false) {
				return (
					<button className="Edit-Profile-Button" onClick={(e) => {
						handleClickBlock()}} >
						<b>Block</b>
					</button>
				);
			} else {
				return (
					<button className="Edit-Profile-Button"
							onClick={(e) => {
								handleClickUnblock()}}>
						<b>Unblock</b>
					</button>
				);
			}
		}
		return(
			<p></p>
		)
	}

	function handleClickFollow(){
		axios.post("/follow",{
			user: location.state.username,
			followed_user: userid
		}).then(res =>{
			setState(prevState => ({ ...prevState,following:true}));
			setState(prevState => ({...prevState, followers: state.followers+1}))
		})
	}

	function handleClickUnfollow(){
		axios.post("/unfollow",{
			user: location.state.username,
			followed_user: userid
		}).then(res =>{
			setState(prevState => ({ ...prevState,following:false}));
			setState(prevState => ({...prevState, followers: state.followers-1}))
		})
	}

	function handleClickBlock(){
		axios.post("/block",{
			user: location.state.username,
			blocked_user: userid
		}).then(res =>{
			setState(prevState => ({ ...prevState, blocking:true}));
			setState(prevState => ({...prevState, blockers: state.blockers + 1}))
		})
	}

	function handleClickUnblock(){
		axios.post("/unblock",{
			user: location.state.username,
			blocked_user: userid
		}).then(res =>{
			setState(prevState => ({ ...prevState,blocking:false}));
			setState(prevState => ({...prevState, blockers: state.blockers - 1}))
		})
	}

	function handClickShowFollowers(parameter){
		if(parameter === FOLLOWERS) {
			navigate(`/Followers/${userid}`, {state: {username:location.state.username, view: "followers"}});
		} else {
			navigate(`/Followers/${userid}`, {state: {username: location.state.username, view: "following"}});
		}
	}

	function handleLike(event, username, id){
        axios.post("/getPost", {
            id: id
        }).then( res => {
            if(res.data.likers.includes(username)){
				unlikePost(event, username, id);
			} else{
				likePost(event, username, id);
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

	function deletePost(event,id) {
        axios.post("/deletePost", {
			id: id
		}).then (res => {
            //put in console all the posts
		}).catch(function (error) {
			console.log("Error Detected")
		})
    }

	function handleClickName(event, name) {
        navigate(`/Profile/${name}`, {state:{username:location.state.username}});
    }

	function handlePost(event, postid){
        navigate(`/Post/${postid}`, {state:{username:location.state.username}});
    }

	function arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};

	function showPost(){
		if(state.viewing === "Posts"){
			return state.posts.slice(0).reverse();
		} else if(state.viewing === "Likes"){
			return state.likedposts.slice(0).reverse();
		} else{
			return state.posts.slice(0).reverse();
		}
	}

	function switchView(view){
		setState(prevState => ({ ...prevState, viewing: view}));
	}


		return (
			<body className="Ignore-X-Overflow">
				<div className="Profile-Top-Banner">
					<button className="Profile-Logo-Button"
						onClick={(e) => {
							handleClickLogo(e, state.username)
						}}>
						<img className='Profile-Logo-Image' src="/Logo_new.png" alt="STEM"></img>
					</button>

					<span className="Profile-Banner-Text">StemSpace</span>

					<button className="Profile-Banner-Button"
						onClick={(e) => {
							handleClickPost(e, state.username)
						}}>
							
						<img src="/post_button.png" className="Profile-Banner-Logos" alt="Create-post"/>
					</button>

					<button className="Profile-Banner-Button"
						onClick={(e) => {
							handleClickNotification(e, state.username)
						}}>
							
						<img src="/Notification.png" className="Profile-Banner-Logos" alt="Notification"/>
					</button>
				</div>

				<div className="Profile-Horizontal-Bar"/>

				{!state.exists && <h1>PROFILE NOT FOUND</h1>}

				{state.blocked && <h1>{state.username} has blocked you.</h1>}

				{state.exists && !state.blocked && <header className="Profile-bio">
					<img className='Profile-picture' src={state.image} alt={"PFP of " + state.username}></img>

					<span className="Profile-info">
							<div>
								<UserPermissionsEditProfile />
								<span className="right-space"/>
								<UserPermissionsLogout />
								<UserPermissionsEditDM />
								<h3>{state.followers} <button className="Big-Green-Button" onClick={(e)=>{handClickShowFollowers(FOLLOWERS)}}>Followers</button></h3>
								<h3>{state.following_number} <button className="Big-Green-Button" onClick={(e)=>{handClickShowFollowers(FOLLOWING)}}>Following</button></h3>
								<p className="username">@{userid}</p>
								<p>{state.bio}</p>
								<FollowButton />
								<span className="right-space"/>
								<BlockButton />
							</div>
					</span>
				</header>}
				
				<div className="Profile-Horizontal-Bar"/>

			{state.exists && loggedin && !state.blocked && <header className="Timeline-Selector">
                <button className="Timeline-Following"
					onClick={(event) => {
						switchView("Posts")
					}}>
					Posts
				</button>

                <div className="Timeline-Vertical-Bar"/>

                <button className="Timeline-Following"
					onClick={(event) => {
						switchView("Likes")
					}}>
					Likes
				</button>

            </header>}

			<div className="Profile-Horizontal-Bar"/>

				{loggedin && !state.blocked && <header class="Profile-Posts-Wrapper">
					{showPost().map((post)=>(
						<div className="Profile-Post">
							{!post.post.anon && <button className="Profile-Post-Name"
								onClick={(event) => {
									handleClickName(event, post.post.author)
								}}>

								<img className="Profile-Post-PFP" src={post.post.image} alt={"PFP of " + post.post.author}></img>
								<b>@{post.post.author}</b>
							</button>  }

							{post.post.anon &&  <button className="Profile-Post-Name">
								<b>@anon</b>
							</button>  }

							<p className="Profile-Post-Topic">Topic: {post.post.topic ?  post.post.topic: "None"}</p>

							<button className="Profile-Post-Content" 
								onClick={(event) => {
									handlePost(event, post.post.id)
								}}>
								
								<p>{post.post.contents}</p>
							</button>
							

							<button className="Profile-Like-Button"
									onClick={(e) => {
										handleLike(e, location.state.username, post.post.id)
									}}>
									
									<b>{post.post.likers.length}|{post.post.likers.includes(location.state.username)? "UNLIKE": "LIKE"}</b>
							</button>

							<div className="Profile-Likers"
								>{post.post.likers.map((liker)=>(
									<button className="Profile-Liker-Button" 
										onClick={(event) => {;
											handleClickName(event, liker)
										}}>

										<b>@{liker}</b> 
									</button>
								))}
							</div>

							{post.post.author===location.state.username && 
							<button className="Profile-Like-Button"
								onClick={(e) => {
									deletePost(e, post.post.id)
								}}>
									
								<b>Delete Post</b>
							</button>}
						</div>
					))}
				</header>}
			</body>
	);
}
export default Profile;