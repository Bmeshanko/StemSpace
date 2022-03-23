import './Profile.css';
import {Component} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";

let location
const UseLocation = () => {
  location = useLocation()
  return null;
}

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      bio: '',
      showName: false ,
      showProfile: false ,
      image: "Blank-Profile.png"
    }
  }
  componentDidMount(){
    this.setState({username:location.state.username})
    axios.post("/getUsers", {
        username: location.state.username
    }).then(res => {
        console.log(res);
        if(res.data == null) {
            alert("Profile not Found")
        } else {
            this.setState({bio: res.data.bio});
        }
    }).catch(function (error) {
        console.log("Error Detected")
    })
  }
  displayNameHandler = (e) => {
    let updatedBio = e.target.value;
    this.setState({ bio: updatedBio });
  }
  handleBioSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showName: true
    });
  }
  handleBioClose = (e) => {
    e.preventDefault();
    axios.post("/editBio", {
        bio: this.state.bio,
        username: this.state.username
    }).then(res => {
        console.log(res.data);
    });

    this.setState({
      showName: false
    });
  }
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
   render(){
      return (  
      <body>
        <UseLocation />
         <p className="Profile-banner">
             <img className='Logo' src="Logo_new.png" alt="STEM"></img>
             <p className='Stem-text'>StemSpace</p>
         </p>
         <header className="Profile-bio">
             <img className='Profile-picture' src={this.state.image}></img>
             <span className="Profile-info">
               <p class="username">@{this.state.username}</p>
               {}
               <div>
                  <form onSubmit={this.handleSubmit}>
                    <label>Bio:</label>
                    <button type="submit" onClick={this.handleBioSubmit}>Edit Bio</button>
                    
                    {this.state.showName && <input type="text" onChange={this.displayNameHandler}name="bio" value={this.state.bio} />}

                    {this.state.showName && <button type="button" onClick={this.handleBioClose}>Close</button>}
                    {<p>{this.state.bio}</p>}

                    <input type="file" onChange={this.onImageChange} className="filetype" id="group_image" />
                  </form>
              </div>
             </span>
         </header>
         <section class="Post-history">
             <p>Post history</p>
         </section>
     </body>);
   }
}
export default Profile;
