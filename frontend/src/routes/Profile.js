import './Profile.css';
import React, {Component, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
function Profile() {
	const navigate = useNavigate();
	const location = useLocation();
	let followbutton;
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
		following_number: 0
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
	}, [])

	function onImageChange(event){
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			const size=event.target.files[0].size;
<<<<<<< HEAD
=======
			if(size>16000)
			{
				alert("File too large, will not be saved!")
			}
>>>>>>> 602eb59e6fdb3623ffbb698e9bf8e2febb1d6684
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
			setState(prevState => ({ ...prevState, following: true}))
			setState((prevState => ({ ...prevState, followers: (state.followers + 1)})))
		})
	}

	function handleClickUnfollow(){
		axios.post("/Unfollow",{
			user: location.state.username,
			followed_user: userid
		}).then(res =>{
			setState(prevState => ({ ...prevState, following: false}))
			setState((prevState => ({ ...prevState, followers: (state.followers - 1)})))
		})
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

		return (
			<body>
			<div className="Timeline-banner">
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
							<h6>{state.followers} followers</h6>
                       		<h6>{state.following_number} following</h6>
							<p className="username">@{state.username}</p>
							<p>{state.bio}</p>
							<FollowButton />
						</div>

             		</span>

			</header>
			</body>
		);
}
export default Profile;