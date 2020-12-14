import React, { Component } from "react";
import styles from "./Login.module.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    render() {
        if (this.props.username == null) {
            return (
                <div className={styles["login"]}>
                    <form className={styles["login-form"]} onSubmit={this.handleLogIn}>
                        <label>Login </label>
                        <input type="text" placeholder="Username" onChange={this.handleChange} value={this.state.text} />
                    </form>
                </div>
            );
        }

        return (
            <div className={styles["login"]}>
                <form className={styles["login-form"]} onSubmit={this.handleLogOut}>
                    <label>Welcome, {this.props.username}.</label>
                    <button className={styles["logout-button"]} type="submit">Log Out</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleLogIn(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        this.props.login(this.state.text);
        this.setState({ text: "" });
    }

    handleLogOut(e) {
        e.preventDefault();
        this.props.logout();
    }
}

export default Login;