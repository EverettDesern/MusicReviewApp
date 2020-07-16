import React, { Component } from 'react';
import { login } from './user-functions'

export default class LoginUser extends Component {

    constructor() {
        super();

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // use spotify API to somehow extract artists and albums?
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
    }

    onChangeUsername(e) {
        this.setState( {
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState( {
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        login(user).then(res => {
            if(res) {
                this.props.history.push(`/profile`)
            }
        })
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}