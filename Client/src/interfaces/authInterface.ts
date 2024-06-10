import { ReactNode } from "react";

export interface ProtectedRoutesProps {
    isAuthenticated: boolean;
    children?: ReactNode;
}

export interface UserRegister{
    username: string;
    password: string;
    email: string;
    dob: string;
    gender:string;
}
export interface UserLogin{
    email:string;
    password:string;
}
export interface FirstState{
    isAuthenticated: boolean;
    user:userData|null;
    token:string|null;
}
export interface userData{
    username:string;
    email:string;
}