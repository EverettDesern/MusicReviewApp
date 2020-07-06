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

router.route('/:id').get((req, res) => {
    Review.findById(req.params.id)
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Review.findByIdAndDelete(req.params.id)
        .then(() => res.json('Review Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Review.findById(req.params.id)
        .then(review => {
            review.username = req.body.username;
            review.artist = req.body.artist;
            review.album = req.body.album;
            review.review = req.body.review;

            review.save()
                .then(() => res.json('Review Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;