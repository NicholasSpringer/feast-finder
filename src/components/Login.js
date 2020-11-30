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
                <form className="form-inline" onSubmit={this.handleLogIn}>
                    <label>Username: </label>
                    <input type="text" onChange={this.handleChange} value={this.state.text} />
                    <button type="submit">Log In</button>
                </form>
            );
        }

        return (
            <form className="form-inline" onSubmit={this.handleLogOut}>
                <label>Welcome, {this.props.username}.</label>
                <button type="submit">Log Out</button>
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