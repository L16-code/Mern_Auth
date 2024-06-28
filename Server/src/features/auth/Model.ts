import { required } from 'joi';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default:null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob:{
        type:String,
    },
    gender:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        default:'user',
        enum:['user','admin']
    },
    google_Verified:{
        type:Boolean,
        default:false
    }
});

export const UserModel = mongoose.model('User', userSchema);
