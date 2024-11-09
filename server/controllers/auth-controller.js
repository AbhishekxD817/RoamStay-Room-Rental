import User from '../models/user.js'
import bcrypt from 'bcrypt'
import ExpressErrors from '../utils/ExpressErrors.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'



const cookieOptions = {
    maxAge: 60 * 60 * 24 * 7 * 1000,   // 7 days in milliseconds
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),  // Set expires to 7 days from now
    httpOnly: true,                    // Ensures the cookie is only sent in HTTP(S) requests
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',  // 'Lax' for localhost
    secure: process.env.NODE_ENV === 'production', // Only secure in production
};



export const signup = async (req, res, next) => {
    let { name, email, password } = req.body;
    let newUser = await new User({
        name, email, password
    });

    await newUser.save();

    let token = await newUser.genToken(newUser._id);
    res.cookie('token', token, cookieOptions);

    return res.json({
        messgae: "Signup successful"
    })
}

export const login = async (req, res, next) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return next(new ExpressErrors(400, "No User Exists"))
    }
    let validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
        return next(new ExpressErrors(401, "Invalid Credentials"))
    }

    let token = await user.genToken(user._id);
    res.cookie('token', token, cookieOptions);

    let { name } = user;
    return res.json({
        messgae: "Login Successfull",
        user: {
            name,
            email
        }

    })
}

export const logout = async (req, res, next) => {
    res.cookie('token', '', { maxAge: 0 });
    return res.json({
        messgae: "Logout Successfull"
    })
}

export const isLoggedIn = async (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return res.json({
            isAuthenticated: false,
            user: null
        })
    }
    let token = await req.cookies.token;
    let validateToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (validateToken) {
        let user = await User.findById(validateToken.payload);

        return res.json({
            isAuthenticated: true,
            user
        })
    }
};
