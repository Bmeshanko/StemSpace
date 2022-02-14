import './Login.css';

function Login() {
  return (
    <body>
      <section className="Login-left">
        <img src="Logo_new.png" className="Logo" alt="STEM"></img>
        <p className= "Login-message">
          <b>Welcome to StemSpace!</b>
        </p>
      </section>
      <section className="Login-right">
        <form>
            <label for="username">
                <input className="Login-username-field" type="text" id="username" name="username" placeholder="Username or Email" />
                <div className="space"></div>
            </label>
            <label for="password">
                <input className="Login-password-field" type="text" id="password" name="password" placeholder="Password" />
                <div className="space"></div>
            </label>
            <button className="Login-button" onClick="myFunction()">Log In</button>
            <div className="space"></div>
            <button className="Signup-button" onClick="myFunction()">Sign Up</button>
        </form>
      </section>
    </body>
  );
}

export default Login;
