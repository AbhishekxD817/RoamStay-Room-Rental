import Review from "../../models/review.js";
import ExpressErrors from "../../utils/ExpressErrors.js";


export const isReviewOwner = async (req, res, next) => {
    let { rid } = req.params;
    let review = await Review.findById(rid);

    // check if req.user._id == review.owner
    if(!review.owner.equals(req.user._id)){
        return next(new ExpressErrors(403,"Access Denied, You are not review owner"));
    }

    return next();
}