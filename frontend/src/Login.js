import './Login.css';

function Login() {
  return (
    <body>
      <section className="Login-left">
        <img src="Logo_new.png" className="Logo" alt="STEM"></img>
        <p className= "Login-welcome">
          <b>StemSpace</b>
          <p className="description">Connect with classmates in your field</p>
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
            <button className="Login-button" onClick="myFunction()"><b>Log In</b></button>
            <br></br>
            <a
                className="Forgot-password"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Forgot Password?
            </a>
            <div className="space"></div>
            <button className="Signup-button" onClick="myFunction()"><b>Create an Account</b></button>
        </form>
      </section>
    </body>
  );
}

export default Login;
