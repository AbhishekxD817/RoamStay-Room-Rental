import { Router } from 'express'
import wrapAsync from '../utils/wrapAsync.js'
import { login, logout, signup, isLoggedIn } from '../controllers/auth-controller.js';

const authRouter = Router();

authRouter.route('/')
    .get(wrapAsync(isLoggedIn));

authRouter.route('/signup')
    .post(wrapAsync(signup))

authRouter.route('/login')
    .post(wrapAsync(login))

authRouter.route('/logout')
    .post(wrapAsync(logout))

export default authRouter;