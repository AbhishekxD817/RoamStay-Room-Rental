import { Router } from 'express';
import { allListings, createListing, deleteListing, showListing, updateListing } from '../controllers/listing-controller.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressFormidable from 'express-formidable';
import { isAuthenticated } from '../middlewares/auth/auth-mw.js';
import { isListingOwner } from '../middlewares/listing/listing-mw.js';

const listingRouter = Router();

listingRouter.use(ExpressFormidable());

listingRouter.route('/')
    .get(wrapAsync(allListings))
    .post(
        wrapAsync(isAuthenticated),
        wrapAsync(createListing)
    )

listingRouter.route('/:id')
    .get(wrapAsync(showListing))
    .put(
        wrapAsync(isAuthenticated),
        wrapAsync(isListingOwner),
        wrapAsync(updateListing)
    )
    .delete(
        wrapAsync(isAuthenticated),
        wrapAsync(isListingOwner),
        wrapAsync(deleteListing)
    )

export default listingRouter;