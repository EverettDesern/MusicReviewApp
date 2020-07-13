import React, { Component } from 'react';
import axios from 'axios';

export default class CreateReview extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeAlbum = this.onChangeAlbum.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // use spotify API to somehow extract artists and albums?
        this.state = {
            username: "",
            artist: "",
            album: "",
            review: "",
            users: [],
            artists: [],
            albums: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState( {
            username: e.target.value
        });
    }
    onChangeArtist(e) {
        this.setState( {
            artist: e.target.value
        });
    }
    onChangeAlbum(e) {
        this.setState( {
            album: e.target.value
        });
    }
    onChangeReview(e) {
        this.setState( {
            review: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const review = {
            username: this.state.username,
            artist: this.state.artist,
            album: this.state.album,
            review: this.state.review
        }

        console.log(review);

        axios.post('http://localhost:5000/reviews/add', review)
            .then(res => console.log(res.data));

        window.location = '/';
    }


    render() {
        return (
            <div>
                <h3>Create New Review</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                            </option>;
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Artist: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.artist}
                            onChange={this.onChangeArtist}
                            />
                    </div>
                    <div className="form-group">
                        <label>Album: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.album}
                            onChange={this.onChangeAlbum}
                            />
                    </div>
                    <div className="form-group">
                        <label>Review: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.review}
                            onChange={this.onChangeReview}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Review" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}