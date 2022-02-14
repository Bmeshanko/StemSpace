import './Signup.css';

function Signup() {
    return (
        <body>
            <header className="Signup-header">
                <label for="username">
                    <input className="Signup-username-field" type="text" id="username" name="username"
                           placeholder="Username"/>
                </label>
                <div className="space"></div>
                <label for="email">
                    <input className="Signup-email-field" type="text" id="email" name="email"
                           placeholder="Email Address"/>
                </label>
                <div className="space"></div>
                <label for="confirm-email">
                    <input className="Signup-confirm-email-field" type="text" id="confirm-email" name="confirm-email"
                           placeholder="Confirm Email"/>
                </label>
                <div className="space"></div>
                <label htmlFor="password">
                    <input className="Signup-password-field" type="text" id="password" name="password"
                           placeholder="Password"/>
                </label>
                <div className="space"></div>
                <label htmlFor="confirm-password">
                    <input className="Signup-confirm-password-field" type="text" id="confirm-password"
                           name="confirm-password"
                           placeholder="Confirm Password"/>
                </label>
                <div className="space"></div>
                <button className="Signup-button2" onClick="myFunction()"><b>Sign Up</b></button>
            </header>
        </body>
    );
}
export default Signup