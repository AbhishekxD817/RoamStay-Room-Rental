import { Router} from 'express'
import wrapAsync from '../utils/wrapAsync.js'
import {getUserDetails} from '../controllers/user-controller.js'
import { isAuthenticated } from '../middlewares/auth/auth-mw.js';

const userRouter = Router();

userRouter.route('/')
    .get(
        wrapAsync(isAuthenticated),
        wrapAsync(getUserDetails))

export default userRouter;