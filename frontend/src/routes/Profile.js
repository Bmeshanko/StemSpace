import './Profile.css';
import React, {Component, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
function Profile() {
	const navigate = useNavigate();
	const location = useLocation();
	const [state, setState] = useState({
		username: location.state.username,
		bio: '',
		image: "",
		following: false
	});
	const {userid} = useParams();
	console.log(userid)
	if(userid === state.username) {

	}
	console.log(location.state.username);
	useEffect(() => {
		axios.post("/getUsers", {
			username: location.state.username
		}).then(res => {
			console.log(res.data)
			if (res.data == null) {
				alert("Profile not Found")
			} else {
				setState(prevState => ({ ...prevState, bio: res.data.bio}));
				let base64Flag = 'data:image/jpeg;base64,';
				let imageStr = arrayBufferToBase64(res.data.img.data.data);
				setState( prevState => ({ ...prevState, image: base64Flag + imageStr}));
				setState(prevState => ({ ...prevState,following:res.data.following.includes(userid)}))
			}
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}, [])

	function onImageChange(event){
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				setState(prevState => ({ ...prevState, image: e.target.result}));
				console.log(e.target.result)
				console.log(state.image)
				axios.post("/editImage", {
					image: e.target.result,
					username: state.username
				}).then(res => {
					console.log(res.data);
				})
			};
			reader.readAsDataURL(event.target.files[0]);
			//console.log(event.target.files[0])
		}
	}

	function arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};

	function handleClickPost(e, username) {
		navigate("/CreatePost", {state: {username: username}});
	}

	function handleClickNotification(e, username) {
		navigate("/Profile", {state: {username: username}});
	}

	function handleClickLogo(e, username) {
		navigate("/Timeline", {state: {username: username}});
	}

	function handleClickEdit(e, username) {
		navigate("/EditProfile", {state: {username: username}});
	}

	function handleCLickLogout(e) {
		navigate("/");
	}

	function handleClickFollow(){
		axios.post("/follow",{
			user: state.username,
			followed_user: userid
		}).then(res =>{
			console.log(res)
			setState(prevState => ({ ...prevState, following: true}))
		})
	}

	function handleClickUnfollow(){
		axios.post("/Unfollow",{
			user: state.username,
			followed_user: userid
		}).then(res =>{
			console.log(res)
			setState(prevState => ({ ...prevState, following: false}))
		})
	}

	function FollowButton(){
		if(state.username != userid) {
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
			if(userid == state.username) {
				return(<button className="Edit-profile-button"
						onClick={(e) => {
							handleClickEdit(e, state.username)
						}}><b>Edit Profile</b>
				</button>)
			}
			return (<p></p>)
		}

	function UserPermissionsLogout() {
		if(userid == state.username) {
			return(	<button className="Edit-profile-button" onClick={(e) => {
				handleCLickLogout(e)
			}}><b>Log Out</b>
			</button>)
		}
		return (<p></p>)
	}

	function UserPermissionsProfilePic() {
		if(userid == state.username) {
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
							handleClickEdit(e, state.username)
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