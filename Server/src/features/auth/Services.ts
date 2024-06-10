import { UserModel } from "./Model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EnvConfig from "../../config/EnvConfig";
import { IUserLogin, IUserRegister } from "./interface";
const response: {
    message: string;
    data?: any;
    success: boolean;
} = { message: "", success: false };
class UserService{
    async userRegister(userdata:IUserRegister) {
        try {
            const {username, password, email,dob,gender} =userdata;
            const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] }); // checks if user already exists or not by email or username beacause both are unique
            if (existingUser) {
                response.success = false;
                response.message = "User already exists";
                return response;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({
                username,
                email,
                password: hashedPassword,
                dob,
                gender,
            });
            const res = await user.save();
            if (res) {
                response.success = true;
                response.message = "User registered successfully";
            } else {
                response.success = false;
                response.message = "User not registered";
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while registering the user";
        }
        return response;
    }
    async userLogin(LoginData:IUserLogin) {
        try {
            const{email, password} =LoginData;
            const user = await UserModel.findOne({ email });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
                if (validPassword) {
                    const env = EnvConfig();
                    const SecretKey = env.secretKey;
                    // generate the jwt token
                    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET || SecretKey, {
                        expiresIn: '1h',
                    });
                    response.success = true;
                    response.message = "User logged in successfully";
                    response.data = {
                        token,
                        user: {
                            username: user.username,
                            email: user.email,
                        },
                    };
                    return response;
                } else {
                    response.success = false;
                    response.message = "Invalid password";
                    return response;
                }
            } else {
                response.success = false;
                response.message = "User not found";
                return response;
            }
        } catch (error) {
            
        }
    }
    async Profile(email:string){
        try {
            const user = await UserModel.findOne({email});
            if (user) {
                response.success = true;
                response.message = "User found";
                response.data = user;
                return response;
            } else {
                response.success = false;
                response.message = "User not found";
                return response;
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while finding the user";
        }
        return response;
    }
}
export default new UserService
