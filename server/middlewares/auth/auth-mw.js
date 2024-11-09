import User from "../../models/user.js";
import ExpressErrors from "../../utils/ExpressErrors.js";
import jwt from 'jsonwebtoken'


export const isAuthenticated = async (req,res,next) =>{

    // first check if token is present
    if(!req.cookies || !req.cookies.token){
        return next(new ExpressErrors(401,"Please Login First"));
    }

    // verify token is correct or not
    let validateToken = await jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY);
    if(!validateToken){
        return next(new ExpressErrors(401,"Invalid Token, Please login first"));
    }

    // now we are confirmed , token is valid and contains user._id as validateToken.payload
    let user = await User.findById(validateToken.payload);
    
    req.user = user;

    return next();

}

