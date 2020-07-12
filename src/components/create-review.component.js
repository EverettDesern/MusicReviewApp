import React, { Component } from 'react';

export default class CreateReview extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeAlbum = this.onChangeAlbum.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            artist: "",
            album: "",
            review: "",
            users: []
        }
    }

    componentDidMount() {
        this.setState({
            users: ['test'],
            username: 'test'
        });
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

        window.location = '/';
    }


    render() {
        return (
            <div>
                <p>You are on the CreateReview Component!</p>
            </div>
        );
    }
}