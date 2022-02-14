import './ForgotPassword.css';

function ForgotPassword() {
    return (
        <body>
            <header className="Forgot-password-header">
                <p className="Forgot-password-text">
                    Please enter the email address your account is registered under.
                </p>
                <label for="Forgot-password-email">
                <input className="Forgot-password-email-field"
                       type="text"
                       id="forgot-password-email"
                       name="forgot-password-email"
                       placeholder="Email" />
                <div className="space"></div>
                <button className="Signup-button"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/Signup';
                        }}><b>Recover Account</b>
                </button>
            </label>
            </header>
        </body>
    );
}

export default ForgotPassword;


