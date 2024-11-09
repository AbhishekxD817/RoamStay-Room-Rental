import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

}, { timestamps: true })


userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    return next();
})

userSchema.methods.genToken = async function (_id) {
    let token = jwt.sign({payload:_id}, process.env.JWT_SECRET_KEY);
    return token;
}


const User = mongoose.model("User", userSchema);





export default User;