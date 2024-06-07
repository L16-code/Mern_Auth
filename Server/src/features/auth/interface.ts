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