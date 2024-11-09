import Listing from "../models/listing.js";
import Review from "../models/review.js";
import uploadImage from "../utils/cloudinaryConfig.js";


export const allListings = async (req, res, next) => {
    let listings = await Listing.find();
    return res.json({
        listings
    })
}

export const showListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate:{
                path:'owner',
                select:"-password -email"
            }
        }).populate({
            path: "owner",
            select: "-password -email"
        });

    return res.json({
        listing
    })
}

export const updateListing = async (req, res, next) => {
    let { id } = req.params;

    let imageUrl;
    if (req.files?.image?.path) {
        imageUrl = await uploadImage(req.files.image.path);
    }

    if (imageUrl) {
        let listing = await Listing.findByIdAndUpdate(id, { image: imageUrl, ...req.fields });
    } else {
        delete req.fields.image;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.fields });
    }

    return res.json({
        message: "Listing updated successfully"
    })
}

export const deleteListing = async (req, res, next) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // listing is deleted from db

    // now we have to delete listing from user.listings
    let idxOfListingInUser = req.user.listings.indexOf(deleteListing._id);
    if (idxOfListingInUser > -1) {
        req.user.listings.splice(idxOfListingInUser, 1);
    }
    await req.user.save();

    // now we have delete all reviews associated with that listing
    for(let i = 0; i < deleteListing.reviews; i++){
        let idx = deleteListing.reviews[i];
        await Review.findByIdAndDelete(idx);
    }


    return res.json({
        message:"Suceessfully deleted"
    })
}

export const createListing = async (req, res, next) => {

    const imageUrl = await uploadImage(req.files.image.path);

    const newListing = await Listing({ image: imageUrl, owner: req.user._id, ...req.fields, });
    await newListing.save();


    // listing is created successfully,
    // now we have to push this listing in current.user.listings
    req.user.listings.push(newListing._id);
    await req.user.save();

    // now we have pushed listing in user.listings

    return res.json({
        message: "New Listing created successfully"
    })
}