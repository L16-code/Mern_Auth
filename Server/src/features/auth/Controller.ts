import express from "express";
import UserService from "./Services"
import EnvConfig from "../../config/EnvConfig";
import { CustomRequest } from "../../middleware/authMiddleware";
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
export const Profile = async (request: CustomRequest, response: express.Response) => {
    try {
        console.log(request.userEmail)
        if (!request.userEmail) {
            return response.status(400).json({ message: "Invalid Token" });
        }
        
        const result = await UserService.Profile(request.userEmail as string);
        response.status(200).json(result);
    } catch (error) {
        response.status(400).json({ message: "Invalid Token" });
    }
}
export const UpdateProfile = async(request: CustomRequest, response: express.Response) => {
    try {
        console.log(request.userEmail)
        if (!request.userEmail) {
            return response.status(400).json({ message: "Invalid Token" });
        }
        const { username, dob, gender, email } = request.body;
        const profileData = { username, dob, gender, email };
        console.log(request.userEmail as string);
        const result = await UserService.ProfileUpdate(profileData, request.userEmail as string);
        response.status(200).json(result);
    } catch (error) {
        response.status(400).json({ message: "Error In code" });
    }
}
export const ShowAllUsers = async(request: express.Request, response: express.Response)=>{
    try {
        const { page = 1, limit = 10, sortBy = 'username', order = 'asc', filter = '' } = request.query;
        const result = await UserService.ShowAllUsers({
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            sortBy: sortBy as string,
            order: order as string,
            filter: filter as string,
        });
        response.status(200).json(result);
    } catch (error) {
        response.status(400).json({ message: "Error In code" });
    }
}