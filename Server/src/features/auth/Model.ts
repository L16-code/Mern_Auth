import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
});

export const UserModel = mongoose.model('User', userSchema);
