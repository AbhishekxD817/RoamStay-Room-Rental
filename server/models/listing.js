import mongoose, { Schema, set } from 'mongoose';

const listingSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },  
    image:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=773",
        // default is if image is undefined or null , if image is not coming
        set:(v)=> v === "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=773" ? v = "" :  v,
        // set is used if image is coming but its value = "";
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},{
    timestamps:true
})

const Listing = mongoose.model('Listing',listingSchema);

export default Listing;
