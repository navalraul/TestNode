
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext';

const Login = () => {


  const [userData, setUserData] = useState({ email: "", password: "" });
  const router = useNavigate();
  const { state, Login } = useContext(AuthContext)

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      const response = await axios.post("http://localhost:8000/login", { userData });
      if (response.data.success) {
        Login(response.data);
        setUserData({ email: "", password: "" });
        toast.success(response.data.message);
        router("/");
        console.log(response.data);
        // console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("Please fill all the fields!");
    }
  }

  useEffect(() => {
    if (state?.user?.name) {
      router('/')
    }
  }, [state])

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
