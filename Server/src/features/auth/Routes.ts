import  express from "express"
import { validateRequest } from "../../middleware/validations"
import { loginSchema, profileSchema, registerSchema, updateProfileSchema } from "./Valdations"
import HandleErrors from "../../middleware/handleErrors"
import { Profile, UpdateProfile, UserRegister, userLogin } from "./Controller"
import verifyToken from "../../middleware/authMiddleware"

const AuthRouter=express.Router()

AuthRouter.post('/register',validateRequest(registerSchema),HandleErrors(UserRegister));
AuthRouter.post('/login',validateRequest(loginSchema),HandleErrors(userLogin));
AuthRouter.get('/profile',verifyToken,HandleErrors(Profile));
AuthRouter.put('/profile',validateRequest(updateProfileSchema),HandleErrors(UpdateProfile));
export default AuthRouter;