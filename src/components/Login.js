import React, { Component } from "react";

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
                <form className="login-form" onSubmit={this.handleLogIn}>
                    <label>Login </label>
                    <input type="text" placeholder="Username" onChange={this.handleChange} value={this.state.text} />
                </form>
            );
        }

        return (
            <form className="login-form" onSubmit={this.handleLogOut}>
                <label>Welcome, {this.props.username}.</label>
                <button className="logout-button" type="submit">Log Out</button>
            </form>
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