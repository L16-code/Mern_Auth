import express from "express";
import UserService from "./Services"
// import { JsonWebTokenError as jwt} from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import EnvConfig from "../../config/EnvConfig";
const env = EnvConfig();

export const UserRegister = async (request: express.Request, response: express.Response) => {
    try {
        const { username, email, password, dob, gender } = request.body;
        const registerData = { username, email, password, dob, gender };
        const result = await UserService.userRegister(registerData)
        response.status(201).json(result)
    } catch (error) {
        response.status(400).json(error)
    }
};
export const userLogin = async (request: express.Request, response: express.Response) => {
    try {
        const { email, password } = request.body;
        const LoginData = { email, password }
        const result = await UserService.userLogin(LoginData)
        response.status(200).json(result)
    } catch (error) {
        response.status(400).json(error)
    }
}
export const Profile = async (request: express.Request, response: express.Response) => {
    try {
        const SecretKey = env.secretKey;
        const authHeader = request.headers['authorization'];
        if (typeof authHeader !== 'undefined') {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, SecretKey);
            if (typeof decoded === 'object' && 'userId' in decoded) {
                const userId = decoded.userId;
                const result = await UserService.Profile(userId);
                response.status(200).json(result);
            } else {
                response.status(400).json({ message: "Invalid Token" });
            }
        } else {
            response.status(400).json({ message: "Invalid Token" });
        }
    } catch (error) {
        response.status(400).json(error)
    }
}
export const UpdateProfile = async(request: express.Request, response: express.Response) => {
    try {
        const SecretKey = env.secretKey;
        const authHeader = request.headers['authorization'];
        if (typeof authHeader !== 'undefined') {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, SecretKey);

            if (typeof decoded === 'object' && 'userId' in decoded) {
                const { username, dob,gender,email } = request.body;
                const ProfileData = { username, dob,gender,email }
                const userId = decoded.userId;
                const result = await UserService.ProfileUpdate(ProfileData,userId);
                response.status(200).json(result);
            } else {
                response.status(400).json({ message: "Invalid Token" });
            }
        } else {
            response.status(400).json({ message: "Invalid Token" });
        }

    } catch (error) {
        response.status(400).json(error)
    }
}