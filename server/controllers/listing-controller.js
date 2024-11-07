import Listing from "../models/listing.js";
import uploadImage from "../utils/cloudinaryConfig.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import ExpressErrors from "../utils/ExpressErrors.js";


export const allListings = async (req, res, next) => {
    let listings = await Listing.find();
    return res.json({
        listings
    })
}

export const showListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
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

    if(imageUrl){
        let listing = await Listing.findByIdAndUpdate(id, { image: imageUrl, ...req.fields });
    }else{
        delete req.fields.image;
        let listing = await Listing.findByIdAndUpdate(id, {...req.fields });
    }
    
    return res.json({
        message:"Listing updated successfully"
    })
}

export const deleteListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    return res.json({
        listing
    })
}

export const createListing = async (req, res, next) => {

    const imageUrl = await uploadImage(req.files.image.path);

    const newListing = await Listing({ image: imageUrl, ...req.fields });
    await newListing.save();
    return res.json({
        message: "New Listing created successfully"
    })
}