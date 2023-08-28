import UserModals from "../Modals/User.modals.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { sendTwilioMessage } from "../Helpers/Sms.js";


export const Register = async ( req, res) => {
    try{
        const {userData} = req.body;
        const { name, email, password,role, number } = userData;
        if(!name || !email || !password || !role || !number ) return res.json({success: false, message: "All fields are mandatory" })

        const isEmailExist = await UserModals.find({email})
        if(isEmailExist.length) {
            return res.json({ success: false, message: "Email is already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModals ({ name, email, password: hashedPassword, role, number})

        await user.save();
        return res.json({ success: true, message: "User registered successfully.."})

    } catch (error) {
        return res.json({ success: false, message: error })
    }

}

export const Login = async (req, res) => {
    try{
        const { email, password } = req.body.userData;
        if(!email || !password) return res.json({ success: false, message: "All fields are mandatory..."})


        const user = await UserModals.findOne({email})
        if(!user) return res.json({ success: false, message: "User not found.."})

        if(user.isBlocked) {
            return res.status(404).json({ success: false, message: "You are Blocked, Contact us." })
        }

        const isPasswordRight = await bcrypt.compare(password, user.password)

        if(isPasswordRight) {
            const userObject = {
                name: user?.name,
                email: user?.email,
                role: user?.role,
                _id: user?._id
            }
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET)
            // console.log(token, "token here")
            return res.json({ success: true, message: "Login Success", user: userObject, token: token})
        }

        return res.json({success: false, message: "Password is wrong.."})

    } catch (error) {
        return res.json({ success: false, message: "errpr from back"})
    }
}


export const getCurrentUser = async ( req, res) => {
    try{
        const { token } = req.body;
        if(!token) return res.status(404).json({ success: false, message: "Token is required!" })

        const decodedData= jwt.verify(token, process.env.JWT_SECRET )

        if(!decodedData) {
            return res.status(404).json({ success: false , message: "Not valid json token.." })
        }

        const userId = decodedData?.userId

        const user = await UserModals.findById(userId);

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            role: user?.role,
            _id: user?._id
        }

        return res.status(200).json({ success: true, user: userObeject })


    } catch (error) {
        return res.json({ success: false , message: error })
    }

}


export const getNumber = async(req, res) => {
    try{

        const { userId} = req.body;
        if(!userId) return res.json({success: false, message: "UserId is mandatory"})

        const userNumber = await UserModals.findById(userId).select("number isNumberVerified")
        if(userNumber) {
            return res.json({success:true, number: userNumber.number, isNumberVerified: userNumber.isNumberVerified })

        }
        return res.json({success: false, message: "Internal error try again.."})

    } catch (error) {
        return res.json({ success: false , message: error })
    }
}

export const sendOtp = async(req, res) => {
    try{

        const { userId } = req.body;
        if(!userId) return res.json({success: false, message: "UserId is mandatory..."})

        const userNumber = await UserModals.findById(userId)

        const otp = "56561"
        const message = `Hi, Your Awdiz mobile verfication otp is ${otp}`
        if(userNumber) {
            const responseFromTwilio = sendTwilioMessage(userNumber.number, message)
            if(responseFromTwilio) {
                userNumber.otpForNumberVerification = otp;
                await userNumber.save()
                return res.json({ success: true, message: "Otp send to your number"})
            }
        }
        return res.json({ success: false, message: "User not found.."})
    } catch (error) {
        return res.json({ success: false , message: error })
    }
}