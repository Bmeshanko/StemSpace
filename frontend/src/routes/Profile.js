import './Profile.css';
import { Component } from 'react';
class Profile extends Component{
  state = {
    bio: 'Nothing Here',
    showName: false ,
    showProfile: false ,
    image: "Blank-Profile.png"
  }
  displayNameHandler = (e) => {
    let updatedBio = e.target.value;
    this.setState({ bio: updatedBio });
  }
  handleBioSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showName: true,
    });
  }
  handleBioClose = (e) => {
    e.preventDefault();
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
      return (<body>
         <p className="Profile-banner">
             <img className='Logo' src="Logo_new.png" alt="STEM"></img>
             <p className='Stem-text'>StemSpace</p>
         </p>
         <header className="Profile-bio">
             <img className='Profile-picture' src={this.state.image}></img>
             <span className="Profile-info">
               <p class="username">@UserName</p>
               {/* MAX CHAR for bio about 1500 */}
               <div>
                  <form onSubmit={this.handleSubmit}>
                    <label>Bio:</label>
                    <button type="submit" onClick={this.handleBioSubmit}>Edit Bio</button>
                    
                    {this.state.showName && <input type="text" name="firstName" onChange={this.displayNameHandler} value={this.state.firstName} />}

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
