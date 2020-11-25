import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.username == null) {
            return (
                <form class="form-inline" onSubmit={this.handleLogIn}>
                    <label>Username:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.text}/>
                    <button type="submit">Log In</button>
                </form>
            )
        }

        return (
            <form class="form-inline" onSubmit={this.handleLogOut}>
                    <label>{this.props.username}'s Feast Finder</label>
                    <button type="submit">Log Out</button>
            </form>
        )
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleLogIn(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
          return;
        }
        this.props.login(this.state.text)
    }

    handleLogOut(e) {
        e.preventDefault();
        this.props.logout()
    }
}

export default Login;