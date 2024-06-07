import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from 'yup';
import { UserRegister } from "../../interfaces/authInterface";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
// import { useEffect } from "react";
const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    dob: yup.string().required(),
    gender: yup.string().required(),
})
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserRegister>({
        resolver: yupResolver(schema),
    })
    const navigate = useNavigate();
    const onSubmit = (data: UserRegister) => {
        axios.post('http://localhost:5000/register', data).then(res => {
            console.log(res.data);
            if (res.data.success === true) {
                toast.success('User Registered Successfully'), {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }
                navigate('/login')
            }else{
                toast.error(res.data.message), {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }
            }
        }).catch(err => {
            console.log(err);
        })
        // navigate('/');
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} noValidate>
                <div><h1 style={{ color: "#556cd6" }} >Register</h1></div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>username</label>
                    <input
                        {...register('username')}
                        id="username"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.username && <p style={{ color: 'red', marginTop: '5px' }}>{errors.username.message}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>email</label>
                    <input
                        {...register('email')}
                        id="email"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.email && <p style={{ color: 'red', marginTop: '5px' }}>{errors.email.message}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>password</label>
                    <input
                        {...register('password')}
                        id="password"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.password && <p style={{ color: 'red', marginTop: '5px' }}>{errors.password.message}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="dob" style={{ display: 'block', marginBottom: '5px' }}>dob</label>
                    <input
                        type="date"
                        {...register('dob')}
                        id="dob"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.dob && <p style={{ color: 'red', marginTop: '5px' }}>{errors.dob.message}</p>}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="gender" style={{ display: 'block', marginBottom: '5px' }}>Gender</label>
                    <select
                        {...register('gender')}
                        id="gender"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p style={{ color: 'red', marginTop: '5px' }}>{errors.gender.message}</p>}
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#556cd6', color: '#fff', border: 'none', borderRadius: '5px' }}>Register</button>
                <div style={{ marginTop: '15px' }}>Already a User?
                    <Link to="/login" >Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register