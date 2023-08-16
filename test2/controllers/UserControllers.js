import UserModals from "../Modals/User.modals.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const Login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) return res.json({ status: "error", message: "All fields are mandatory..."})


        const user = await UserModals.findOne({email})
        if(!user) return res.json({ status: "error", message: "User not found.."})

        const isPasswordRight = await bcrypt.compare(password, user.password)

        if(isPasswordRight) {
            const userObject = {
                name: user.name,
                email: user.email,
                _id: user._id
            }
            const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET)
            // console.log(token, "token here")
            return res.json({ status: "Success", message: "Login Success", user: userObject, token: token})
        }

        return res.json({status: "error", message: "Password is wrong.."})

    } catch (error) {
        return res.json({ status: "error", message: error})
    }
}



export const Register = async ( req, res) => {
    try{
        const { name, email, password,role} = req.body;
        if(!name || !email || !password || !role) return res.json({ status: "error", message: "All fields are mandatory" })

        const isEmailExist = await UserModals.find({email})
        if(isEmailExist.length) {
            return res.json({ status: "error", message: "Email is already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModals ({ name, email, password: hashedPassword, role})

        await user.save();
        return res.json({ status: "Success", message: "User registered successfully.."})

    } catch (error) {
        return res.json({ status: "error", message: error })
    }

}

export const getCurrentUser = async ( req, res) => {
    try{
        const { token } = req.body;
        if(!token) return res.status(404).json({ status: "error", message: "Token is required!" })

        const decodedData= jwt.verify(token, process.env.JWT_SECRET )

        if(!decodedData) {
            return res.status(404).json({ status: "error", message: "Not valid json token.." })
        }

        const userId = decodedData?.userId

        const user = await UserModals.findById(userId);

        if(!user) {
            return res.status(404).json({ status: "error", message: "User not found.." })
        }

        const userObeject = {
            name: user?.name,
            email: user?.email,
            _id: user?._id
        }

        return res.status(200).json({ status: "Success", user: userObeject })


    } catch (error) {
        return res.json({ status: "error", message: error })
    }

}
