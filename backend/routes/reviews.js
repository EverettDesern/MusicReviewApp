const router = require('express').Router();
let Review = require('../models/review.model');

router.route('/').get((req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const artist = req.body.artist;
    const album = req.body.album;
    const review = req.body.review;


    const newReview = new Review({
        username,
        artist, 
        album,
        review,
    });

    newReview.save()
        .then(() => res.json('Review added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;