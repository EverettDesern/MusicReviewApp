import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            errors: {}
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded.username);
        console.log(decoded.email);
        this.setState({
            username: decoded.username,
            email: decoded.email
        })
    }

    render() {
        return (
            <div className = "container">
                <div className = "jumbotron mt-5">
                    <div className = "col-sm-8 mx-auto">
                        <h1 className = "text-center">Profile</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{this.state.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}