import { UserModel } from "./Model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EnvConfig from "../../config/EnvConfig";
import { IGoogleCredential, IProfileData, IUserLogin, IUserRegister, QueryParams } from "./interface";
const response: {
    message: string;
    data?: unknown;
    success: boolean;
} = { message: "", success: false };
function isISignUp(data: unknown): data is IUserRegister {
    return (data as IUserRegister).username !== undefined &&
        (data as IUserRegister).email !== undefined &&
        (data as IUserRegister).password !== undefined &&
        (data as IUserRegister).dob !== undefined &&
        (data as IUserRegister).gender !== undefined;
}
function isIGoogleCredential(data: unknown): data is IGoogleCredential {
    return (data as IGoogleCredential).token !== undefined;
}
function isILogIn(data: unknown): data is IUserLogin {
    return (data as IUserLogin).email !== undefined &&
        (data as IUserLogin).password !== undefined;
}
class UserService {
    async userRegister(userdata: IUserRegister) {
        if (isISignUp(userdata)) {
            const { username, password, email, dob, gender } = userdata;
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
                response.data = '';

            } else {
                response.success = false;
                response.message = "User not registered";
                response.data = '';

            }
        } else if (isIGoogleCredential(userdata)) {
            const env = EnvConfig();
            const SecretKey = env.secretKey;
            const { token } = userdata;
            // console.log(jwt.decode(token))
            if (token) {
                const decodedData = jwt.decode(token) as { email: string; given_name: string };
                const email = decodedData.email
                const existingUser = await UserModel.findOne({ email }); // checks if user already exists or not by email
                if (existingUser) {
                    response.message = "User already exists";
                    response.success = false;
                    response.data = null;
                    return response;
                }
                const username = decodedData.given_name
                const newUser = new UserModel({
                    username: username,
                    email: email,
                    password: null,
                    dob: null,
                    gender: null,
                    google_Verified: true
                });
                const savedUser = await newUser.save();
                const Newtoken = jwt.sign({ userEmail: savedUser.email, role: savedUser.role }, process.env.JWT_SECRET || SecretKey, {
                    expiresIn: '1h',
                });
                response.success = true;
                response.message = "User logged in successfully";
                response.data = {
                    Newtoken,
                    user: {
                        id: savedUser._id,
                        username: savedUser.username,
                        email: savedUser.email,
                    },
                };
            }
        }

        return response;
    }
    async userLogin(LoginData: IUserLogin) {
        if (isILogIn(LoginData)) {
            const { email, password } = LoginData;
            const user = await UserModel.findOne({ email });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
                if (validPassword) {
                    const env = EnvConfig();
                    const SecretKey = env.secretKey;
                    // generate the jwt token
                    const token = jwt.sign({ userEmail: user.email, role: user.role }, process.env.JWT_SECRET || SecretKey, {
                        expiresIn: '1h',
                    });
                    response.success = true;
                    response.message = "User logged in successfully";
                    response.data = {
                        token,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                        },
                    };
                } else {
                    response.success = false;
                    response.message = "Invalid password";
                    response.data = '';
                }
            } else {
                response.success = false;
                response.message = "User not found";
                response.data = '';
            }
        }
        else if(isIGoogleCredential(LoginData)){
            const env = EnvConfig();
            const SecretKey = env.secretKey;
            const { token } = LoginData;
            // console.log(jwt.decode(token))
            if (token) {
                const decodedData = jwt.decode(token) as { email: string; given_name: string };
                const email = decodedData.email
                const user = await UserModel.findOne({ email });
                if (user) {
                    const token = jwt.sign({ userEmail: user.email, role: user.role }, process.env.JWT_SECRET || SecretKey, {
                        expiresIn: '1h',
                    });
                    response.success = true;
                    response.message = "User logged in successfully";
                    response.data = {
                        token,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                        },
                    };
                } else {
                    response.success = false;
                    response.message = "User not found";
                    response.data = '';
                }
            }

        }
        return response;
    }
    async Profile(email: string) {
        try {
            const user = await UserModel.findOne({ email }, {
                username: 1, email: 1, _id: 0,
                dob: 1,
                gender: 1
            });
            if (user) {
                response.success = true;
                response.message = "User found";
                response.data = user;
                return response;
            } else {
                response.success = false;
                response.message = "User not found";
                response.data = '';
                return response;
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while finding the user";
            response.data = '';

        }
        return response;
    }
    async ProfileUpdate(ProfileData: IProfileData, email: string) {
        try {
            const user = await UserModel.findOneAndUpdate({ email }, ProfileData);
            if (user) {
                response.success = true;
                response.message = "User found";
                response.data = user;
                return response;
            } else {
                response.success = false;
                response.message = "User not found";
                response.data = '';
                return response;
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while finding the user";
        }
        return response;
    }
    async ShowAllUsers({ page, limit, sortBy, order, filter }: QueryParams) {
        try {
            const offset = (page - 1) * limit;
            const users = await UserModel.find({ username: new RegExp(filter, 'i'), role: 'user' })
                .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
                .skip(offset)
                .limit(limit);
            const totalUsers = await UserModel.countDocuments({ username: new RegExp(filter, 'i') });
            return {
                success: true,
                message: "Users found",
                data: users,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
            }
        } catch (error) {
            response.success = false;
            response.message = "An error occurred while finding the users";
        }
        return response;
    }
}
export default new UserService
