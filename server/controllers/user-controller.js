import User from '../models/user.js'

export const getUserDetails = async (req,res,next) =>{
    let user = await User.findById(req.user._id).populate({
        path:'listings'
    });
    return res.json({
        user
    })
}
