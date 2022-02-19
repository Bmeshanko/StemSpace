import './Profile.css';
import { Component } from 'react';
class Profile extends Component{
  state = {
    bio: 'I hate myself',
    showName: false
  }
  displayNameHandler = (e) => {
    let updatedBio = e.target.value;
    this.setState({ bio: updatedBio });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showName: true
    });
  }
  handleClose = (e) => {
    e.preventDefault();
    this.setState({
      showName: false
    });
  }
   render(){
      return (<body>
         <p className="Profile-banner">
             <img className='Logo' src="Logo_new.png" alt="STEM"></img>
             <p className='Stem-text'>StemSpace</p>
         </p>
         <header className="Profile-bio">
             <img className='Profile-picture' src="Blank-Profile.png" alt="STEM" ></img>
             <span className="Profile-info">
               <p class="username">@UserName</p>
               {/* MAX CHAR for bio about 1500 */}
               <div>
        <form onSubmit={this.handleSubmit}>
          <label>Bio:</label>
          <button type="submit" onClick={this.handleSubmit}>Edit</button>
          {this.state.showName && <input type="text" name="firstName" onChange={this.displayNameHandler} value={this.state.firstName} />}

          {this.state.showName && <button type="button" onClick={this.handleClose}>Close</button>}
          {<p>{this.state.bio}</p>}
        </form>
      </div>
             </span>
         </header>
         <section class="Post-history">
             Post History
             <p></p>
     
         </section>
     </body>);
   }
}
export default Profile;
