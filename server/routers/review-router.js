import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { createReview, deleteReview, readAllReviews, updateReview } from "../controllers/review-controller.js";

const reviewRouter = Router({mergeParams:true});

reviewRouter.route('/')
    .get(wrapAsync(readAllReviews))
    .post(wrapAsync(createReview))

reviewRouter.route('/:rid')
    .put(wrapAsync(updateReview))
    .delete(wrapAsync(deleteReview))


export default reviewRouter;
