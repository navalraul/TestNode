import React, { useContext, useEffect, useState } from 'react';
import AuthProtected from './Common/AuthProtected';
import { AuthContext } from './Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Profile = () => {

    const [number, setNumber ] = useState();
    const [otp, setOtp] = useState();
    const [isNumberVerified, setIsNumberVerified ] = useState(true);
    const [isOtpSent, setIsOtpSent ] = useState(false);
    const { state } = useContext(AuthContext)

    const sendOtp = async (req, res) => {
        const response = await axios.post('http://localhost:8000/send-otp', { userId: state?.user?._id })
        if(response.data.success) {
            setIsOtpSent(true);
            toast.success("Otp has sent to your number, Please verify it.")
        }
    }

    const verifyOtp = async (req, res) => {
        const response = await axios.post('http://localhost:8000/verify-otp', { userId: state?.user?._id, otp })
        if(response.data.success) {
            setIsOtpSent(false);
            setIsNumberVerified(response.data.isNumberVerified)
            toast.success("Otp is Verified")
        }
    }


    useEffect(() => {
        async function getNumber() {
            try{
                const response = await axios.post("http://localhost:8000/get-number", { userId: state?.user?._id })
                if (response.data.success) {
                    console.log(response.data, "response.data")
                    setNumber(response.data.number)
                    setIsNumberVerified(response.data.isNumberVerified)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (state?.user?._id) {
            getNumber()
        }
    },[state])

  return (
    <AuthProtected>
        <h1>Your Profile</h1>
        <h3>Complete your verification</h3>
        <h4>Your Number:{number}</h4>
        {isNumberVerified? <h4>Your number verified.</h4>: <button onClick={sendOtp}>Verify Your Number</button>}
        {isOtpSent && <div>
            <input onChange={(event)=> setOtp(event.target.value)} placeholder='Type your Otp' />
            <button onClick={verifyOtp}>Submit Otp</button>
            </div>}
    </AuthProtected>
  )
}

export default Profile
