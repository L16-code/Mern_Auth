import  express from "express"
import { validateRequest } from "../../middleware/validations"
import { loginSchema, registerSchema } from "./Valdations"
import HandleErrors from "../../middleware/handleErrors"
import { UserRegister, userLogin } from "./Controller"

const AuthRouter=express.Router()

AuthRouter.post('/register',validateRequest(registerSchema),HandleErrors(UserRegister))
AuthRouter.post('/login',validateRequest(loginSchema),HandleErrors(userLogin))
AuthRouter.get('/profile',(req, res) => {
    res.json({ message: 'Hello from backend!' });
  });

export default AuthRouter;