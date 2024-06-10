export interface IUserRegister{
    username: string;
    email: string;
    password: string;
    dob: string;
    gender:string;
}

export interface IUserLogin{
    email:string;
    password:string;
}

export interface IProfileData{
    username:string;
    email:string;
    dob:string;
    gender:string;
}