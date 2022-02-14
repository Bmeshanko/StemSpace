import './Profile.css';

function Profile() {
  return (
    <div className="Profile">
    <header className="Profile-title">
        <img src="Logo_new.png" className="Logo-size" alt="STEM"></img>
        <p>StemSpace</p>
    </header>
    <br></br>
    <img src="Blank-Profile.png" className="Profile-picture" alt="STEM"></img>
    <header className="Profile-body">
        <p>User Name</p>
        <p>Bio Stuff</p>
    </header>
    <header className="Profile-posts">
        <p>Post History</p>
        <p>Post</p>
        <p>Post</p>
        <p>Post</p>
        <p>Post</p>
    </header>
    </div>
  );
}

export default Profile;
