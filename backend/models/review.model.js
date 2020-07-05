const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema( {
    username: { type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    review: {type: String, required:true},
    },{
        timestamps:true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;