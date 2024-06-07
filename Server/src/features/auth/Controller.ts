import  express  from "express";
import UserService from "./Services"
export const UserRegister=async (request: express.Request, response: express.Response) => {
    try {
        const { username, email, password,dob , gender } = request.body;
        const registerData={username, email, password,dob, gender};
        const result =await UserService.userRegister(registerData)
        response.status(201).json(result)
    } catch (error) {
        response.status(400).json(error)
    }
};
export const userLogin = async (request: express.Request, response: express.Response) => {
    try {
        const { email, password } = request.body;
        const LoginData={email, password}
        const result = await UserService.userLogin(LoginData)
        response.status(200).json(result)
    } catch (error) {
        response.status(400).json(error)
    }
} 