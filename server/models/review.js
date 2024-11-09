import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 3
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema);

export default Review;