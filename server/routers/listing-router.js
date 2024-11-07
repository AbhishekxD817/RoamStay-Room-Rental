import { Router } from 'express';
import { allListings, createListing, deleteListing, showListing, updateListing } from '../controllers/listing-controller.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressFormidable from 'express-formidable';

const listingRouter = Router();

listingRouter.use(ExpressFormidable());

listingRouter.route('/')
    .get(wrapAsync(allListings))
    .post(wrapAsync(createListing))

listingRouter.route('/:id')
    .get(wrapAsync(showListing))
    .put(wrapAsync(updateListing))
    .delete(wrapAsync(deleteListing))

export default listingRouter;