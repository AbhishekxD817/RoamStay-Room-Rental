import Listing from "../../models/listing.js";
import ExpressErrors from "../../utils/ExpressErrors.js";

export const isListingOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    
    if(!req.user._id.equals(listing.owner)){
        return next(new ExpressErrors(403,"Access Denied, You dont have Permissions"));
    }

    return next();
}