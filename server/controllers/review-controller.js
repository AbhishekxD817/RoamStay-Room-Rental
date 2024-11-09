import Listing from '../models/listing.js';
import Review from '../models/review.js'
import ExpressErrors from '../utils/ExpressErrors.js';

export const createReview = async (req, res, next) => {
    let { lid } = req.params;
    
    let review = await new Review({
        owner:req.user._id,
        ...req.body
    });
    await review.save();
    // review is created
    

    // now push review in listing.reviews
    let listing = await Listing.findById(lid);
    listing.reviews.push(review._id);
    await listing.save();

    // now push review in current user.reviews
    req.user.reviews.push(review._id);
    await req.user.save();

    return res.json({
        review
    })
}

export const readAllReviews = async (req, res, next) => {
    let { lid } = req.params;

    const allReviews = await Review.find();

    return res.json({
        reviews: allReviews
    })
}

export const updateReview = async (req, res, next) => {
    let { lid, rid } = req.params;
    let review = await Review.findById(rid);

    let updatedReview = await Review.findByIdAndUpdate(rid, { ...req.body });

    return res.json({
        message: "Review Updated"
    })
}

export const deleteReview = async (req, res, next) => {
    let { lid, rid } = req.params;
    
    let deletedReview = await Review.findByIdAndDelete(rid);
    // now review is deleted

    // we have to remove it from listing.reviews also
    let listing = await Listing.findById(lid);
    let idxOfReviewInListing = listing.reviews.indexOf(rid);
    if(idxOfReviewInListing > -1){
        listing.reviews.splice(idxOfReviewInListing,1);
    };
    await listing.save();

    // we have to remove it from current user.reviews also
    let idxOfReviewInUser = req.user.reviews.indexOf(rid);
    if(idxOfReviewInUser > -1){
        req.user.reviews.splice(idxOfReviewInListing,1);
    }
    await req.user.save();

    return res.json({
        message:"Review deleted successfully"
    })
}