import './RecoverAccount.css';

function RecoverAccount() {
    return (
        <body>
        <header className="Recover-account-header">
            <p className="Recover-account-text">
                Enter your new password and the code you received through email.
            </p>
            <label for="Recover-account-password">
                <input className="Recover-account-password-field"
                       type="password"
                       id="recover-account-password"
                       name="recover-account-password"
                       placeholder="New Password" />
                <div className="space"></div>
                <input className="Recover-account-confirm-password-field"
                       type="password"
                       id="recover-account-confirm-password"
                       name="recover-account-confirm-password"
                       placeholder="Confirm Password" />
                <div className="space"></div>
                <input className="Recover-account-code-field"
                       type="text"
                       id="recover-account-code"
                       name="recover-account-code"
                       placeholder="Recovery Code" />
                <div className="space"></div>
                <button className="Change-password-button"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/Login';
                        }}><b>Change Password</b>
                </button>
            </label>
        </header>
        </body>
    );
}

export default RecoverAccount;


