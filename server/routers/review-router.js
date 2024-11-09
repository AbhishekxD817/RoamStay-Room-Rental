import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { createReview, deleteReview, readAllReviews, updateReview } from "../controllers/review-controller.js";
import { isAuthenticated } from "../middlewares/auth/auth-mw.js";
import { isListingOwner } from "../middlewares/listing/listing-mw.js";
import { isReviewOwner } from "../middlewares/review/review-mw.js";

const reviewRouter = Router({ mergeParams: true });


reviewRouter.route('/')
    .get(
        wrapAsync(isAuthenticated),
        wrapAsync(readAllReviews)
    )
    .post(
        wrapAsync(isAuthenticated),
        wrapAsync(createReview)
    )

reviewRouter.route('/:rid')
    .put(
        wrapAsync(isAuthenticated),
        wrapAsync(isReviewOwner),
        wrapAsync(updateReview)
    )
    .delete(
        wrapAsync(isAuthenticated),
        wrapAsync(isReviewOwner),
        wrapAsync(deleteReview)
    )


export default reviewRouter;
