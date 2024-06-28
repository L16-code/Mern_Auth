import  express from "express"
import { validateRequest } from "../../middleware/validations"
import { loginSchema, registerSchema, updateProfileSchema } from "./Valdations"
import HandleErrors from "../../middleware/handleErrors"
import { Profile, ShowAllUsers, UpdateProfile, UserRegister, userLogin } from "./Controller"
import verifyToken from "../../middleware/authMiddleware"

const AuthRouter=express.Router()

AuthRouter.post('/register',HandleErrors(UserRegister));
AuthRouter.post('/login',validateRequest(loginSchema),HandleErrors(userLogin));
AuthRouter.get('/profile',verifyToken(null),HandleErrors(Profile));
AuthRouter.put('/profile',verifyToken(null),validateRequest(updateProfileSchema),HandleErrors(UpdateProfile));
AuthRouter.get('/users',verifyToken('admin'),HandleErrors(ShowAllUsers));

export default AuthRouter;