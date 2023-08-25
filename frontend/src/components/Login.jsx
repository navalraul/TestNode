import axios from 'axios';
import React, {  useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MyUserContext } from './Context/Mycontext';

const Login = () => {


    const [userData, setUserData] = useState({ email: "", password: ""});
    const router = useNavigate();
    const { state, dispatch } = useContext(MyUserContext)

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            const response = await axios.post("http://localhost:8000/login", { userData });
            if (response.data.success) {
                dispatch ({
                    type : "LOGIN",
                    payload : response.data.user
                })
                localStorage.setItem("token", JSON.stringify(response.data.token))

                setUserData({ email: "", password: "" })
                router('/')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }


    useEffect(() => {
        if(state?.user?.name) {
            'router'('/')
        }
    },[state])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Password</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <input type='submit' value='Login' /><br />
            </form>
            <button onClick={() => router('/register')}>Register</button>
        </div>
    )
}

export default Login
