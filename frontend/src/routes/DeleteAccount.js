import './DeleteAccount.css';
import {Component} from "react";
import axios from "axios";

class DeleteAccount extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            confirm: ''
        }
    }

    pressButton(e) {
        e.preventDefault();
        if (this.state.password == this.state.confirm) {
            axios.post("/deleteUser", {
                username: this.state.username,
                password: this.state.password
            }).then();
        }
    }

    handleChange(event) {
        const {name, value} = event.target;

        setUser(prevUser=> {
            return {
                ...prevUser,
                [name]: value
            }
        })
    }

    render() {
        return (
            <body>
            <header className="Delete-account-header">
                <p className="Delete-account-text">
                    Sorry to see you go. Enter your credentials to confirm deletion.
                </p>
                <label for="Delete-account">
                    <input className="Delete-account-username-field"
                           type="text"
                           id="username-account-password"
                           name="username-account-password"
                           value={this.state.username}
                           placeholder="Username"/>
                    <div className="space"></div>
                    <input className="Delete-account-password-field"
                           type="password"
                           id="delete-account-password"
                           name="delete-account-password"
                           value={this.state.password}
                           placeholder="Password"/>
                    <div className="space"></div>
                    <input className="Delete-account-confirm-password-field"
                           type="password"
                           id="delete-account-confirm-password"
                           name="delete-account-confirm-password"
                           value={this.state.confirm}
                           placeholder="Confirm Password"/>
                    <div className="space"></div>
                    <button className="Delete-account-button"
                            onClick={
                                (e) =>
                                {
                                    this.pressButton(e)
                                }
                            }><b>Delete Account</b>
                    </button>
                </label>
            </header>
            </body>
        );
    }
}

export default DeleteAccount;


