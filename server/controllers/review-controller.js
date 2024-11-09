import Listing from '../models/listing.js';
import Review from '../models/review.js'
import ExpressErrors from '../utils/ExpressErrors.js';

export const createReview = async (req, res, next) => {
    let { lid } = req.params;
    
    let review = await new Review({
        listing: lid,
        ...req.body
    });
    
    let listing = await Listing.findById(lid);
    listing.reviews.push(review._id);
    await listing.save();
    
    await review.save();

    return res.json({
        review
    })
}

export const readAllReviews = async (req, res, next) => {
    let { lid } = req.params;

    const allReviews = await Review.find({
        listing: lid
    });

    return res.json({
        reviews: allReviews
    })
}

export const updateReview = async (req, res, next) => {
    let { lid, rid } = req.params;
    let review = await Review.findById(rid);

    if (!review.listing.equals(lid)) {
        return next(new ExpressErrors(403, "Invalid Operation"));
    }

    let updatedReview = await Review.findByIdAndUpdate(rid, { listing: lid, ...req.body });

    return res.json({
        message: "Review Updated"
    })
}

export const deleteReview = async (req, res, next) => {
    let { lid, rid } = req.params;
    let review = await Review.findById(rid);
    
    
    if (!review.listing.equals(lid)) {
        return next(new ExpressErrors(403, "Invalid Operation"));
    }
    
    let deletedReview = await Review.findByIdAndDelete(rid);
    
    let listing = await Listing.findById(lid);
    let idxOfReviewInListing = listing.reviews.indexOf(rid);
    if(idxOfReviewInListing > -1){
        listing.reviews.splice(idxOfReviewInListing,1);
    };

    return res.json({
        message:"Review deleted successfully"
    })
}