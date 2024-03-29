import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext';

const Register = () => {

    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer", number: "" })
    const router = useNavigate();
    const { state } = useContext(AuthContext)


    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleChangeForSelect = (event) => {
        setUserData({ ...userData, "role": event.target.value })
    }
    // console.log(userData, "userData")

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password && userData.confirmPassword && userData.name && userData.role && userData.number) {
            if (userData.password === userData.confirmPassword) {
                const response = await axios.post("http://localhost:8000/register", { userData })
                if (response.data.success) {
                    setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer", number: "" })
                    router('/login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                toast.error("Password and ConfirmPassword not matched...")
            }
        } else {
            toast.error("All fields are mandatory...")
        }

    }

    useEffect(() => {
        if (state?.user?.name) {
            router('/')
        }
    }, [state])

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input type='text' onChange={handleChange} name='name' value={userData.name} /><br />
                <label>Email</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Contact Number</label><br />
                <input type='number' onChange={handleChange} name='number' value={userData.number} /><br />
                <label>Role</label><br />
                <select onChange={handleChangeForSelect} >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select><br />
                <label>Password</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <label>ConfirmPassword</label><br />
                <input type='password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} /><br />
                <input type='submit' value='Register' /><br />
            </form>
            <button onClick={() => router('/login')}>Login</button>
        </div>
    )
}

export default Register;
