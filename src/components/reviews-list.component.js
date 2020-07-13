import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Review = props => (
    <tr>
        <td>{props.review.username}</td>
        <td>{props.review.artist}</td>
        <td>{props.review.album}</td>
        <td>{props.review.review}</td>
        <td>
            <Link to={"/edit/"+props.review._id}>edit</Link> | <a href="#" onClick={() => {props.deleteReview(props.review._id)}}>delete</a>
        </td>
    </tr>
)

export default class ReviewsList extends Component {
    constructor(props) {
        super(props);

        this.deleteReview = this.deleteReview.bind(this);

        this.state = {reviews: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/reviews/')
            .then(response => {
                this.setState({reviews: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteReview(id) {
        axios.delete('http://localhost:5000/reviews/' + id)
            .then(res => console.log(res.data));
        this.setState({
            reviews: this.state.reviews.filter(el => el._id !== id)
        })
    }

    reviewList() {
        return this.state.reviews.map(currentreview => {
            return <Review review={currentreview} deleteReview={this.deleteReview} key={currentreview._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Reviews</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.reviewList() }
                    </tbody>
                </table>
            </div>
        );
    }
}