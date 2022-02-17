import './Profile.css';

function Profile() {
  return (
    <body>
    <p className="Profile-banner">
        <img className='Logo' src="Logo_new.png" alt="STEM"></img>
        <p className='Stem-text'>StemSpace</p>
    </p>
    <header className="Profile-bio">
        <img className='Profile-picture' src="Blank-Profile.png" alt="STEM"></img>
        <p class="username">User Name</p>
        <p>Bio</p>
    </header>
    <span class="post-history">
        Post History
    </span>
</body>
  );
}

export default Profile;
