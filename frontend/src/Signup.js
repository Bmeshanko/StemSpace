import './Signup.css';

function Signup() {
    return (
        <body>
            <label for="username">
                <input className="Signup-username-field" type="text" id="username" name="username"
                       placeholder="Username"/>
            </label>
            <label for="password">
                <input className="Signup-password-field" type="text" id="password" name="password"
                       placeholder="Password"/>
            </label>
            <label for="confirm-password">
                <input className="Signup-confirm-password-field" type="text" id="confirm-password" name="confirm-password"
                       placeholder="Confirm Password"/>
            </label>
            <label for="email">
                <input className="Signup-email-field" type="text" id="email" name="email"
                       placeholder="Email Address"/>
            </label>
            <label for="confirm-email">
                <input className="Signup-confirm-email-field" type="text" id="confirm-email" name="confirm-email"
                       placeholder="Confirm Email"/>
            </label>
        </body>
    );
}
export default Signup