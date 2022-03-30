import './Profile.css';
import React, {Component} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

let location
const UseLocation = () => {
	location = useLocation()
	return null;
}
let navigate
const UseNavigate= () =>{
	navigate=useNavigate()
	return null;
}
class Profile extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			bio: '',
			image: ""
		}
	}
	componentDidMount(){
		this.setState({username:location.state.username})
		axios.post("/getUsers", {
			username: location.state.username
		}).then (res => {
			if (res.data == null) {
				alert("Profile not Found")
			} else {
				this.setState({bio: res.data.bio});
				let base64Flag = 'data:image/jpeg;base64,';
				let imageStr = this.arrayBufferToBase64(res.data.img.data.data);
				this.setState({image: base64Flag + imageStr});
			}
		}).catch(function (error) {
			console.log("Error Detected")
		})
	}

	onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.setState({image: e.target.result});
				axios.post("/editImage", {
					image: this.state.image,
					username: this.state.username
				}).then(res => {
					console.log(res.data);
				})
			};
			reader.readAsDataURL(event.target.files[0]);
			//console.log(event.target.files[0])
		}
	}
	arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));
		bytes.forEach((b) => binary += String.fromCharCode(b));
		return window.btoa(binary);
	};

	handleClickPost(e, username) {
		navigate("/CreatePost", {state:{username:username}});
	}

	handleClickNotification(e, username) {
		navigate("/Profile", {state:{username:username}});
	}

	handleClickLogo(e, username) {
		navigate("/Timeline", {state:{username:username}});
	}

	handleClickEdit(e, username) {
		navigate("/EditProfile", {state:{username:username}});
	}

	handleCLickLogout(e) {
		navigate("/");
	}

	render(){
		return (
			<body>
				<UseLocation />
				<UseNavigate />
				<div className="Timeline-banner">
					<button className="Timeline-logo-button"
							onClick={(e) => {
								this.handleClickLogo(e, this.state.username)
							}}
					><b><img className='Timeline-logo' src="Logo_new.png" alt="STEM"></img></b>
					</button>

					<a className="Timeline-banner-text">StemSpace</a>
					<button className="Notification-button"
							onClick={(e) => {
								this.handleClickPost(e, this.state.username)
							}}
					><b><img src="post_button.png" className="Notification-logo" alt="Create-post"/></b>
					</button>
					<button className="Notification-button"
							onClick={(e) => {
								this.handleClickEdit(e, this.state.username)
							}}
					><b><img src="Notification.png" className="Notification-logo" alt="Notification"/></b>
					</button>
				</div>
				<div className="Timeline-bar-horizontal"/>
				<header className="Profile-bio">
					<img className='Profile-picture' src={this.state.image}></img>
					<span className="Profile-info">
						<div>
							<div className="space"/>
							<button className="Edit-profile-button"
									onClick={(e) => {
										this.handleClickEdit(e, this.state.username)
									}}><b>Edit Profile</b>
								</button>
								<button className="Edit-profile-button"
										onClick={(e) => {
											this.handleCLickLogout(e)
										}}><b>Log Out</b>
								</button>
								<button className="Profile-Picture-Button">
									<label htmlFor="image"><b>Change Picture</b></label>
									<input type="file" onChange={this.onImageChange} id="image" name="image" value="" required/>
								</button>
							<p className="username">@{this.state.username}</p>
							<p>{this.state.bio}</p>
						</div>
             		</span>
				</header>
			</body>
		);
	}
}
export default Profile;