import UserModals from "../Modals/User.modals.js";
import bcrypt from 'bcrypt'

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
            return res.json({ status: "Success", message: "Login Success", user: userObject})
        }

        return res.json({status: "error", message: "Password is wrong.."})

    } catch (error) {
        return res.json({ status: "error", message: error})
    }
}



export const Register = async ( req, res) => {
    try{
        const { name, email, password} = req.body;
        if(!name || !email || !password) return res.json({ status: "error", message: "All fields are mandatory" })

        const isEmailExist = await UserModals.find({email})
        if(isEmailExist.length) {
            return res.json({ status: "error", message: "Email is already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModals ({ name, email, password: hashedPassword})

        await user.save();
        return res.json({ status: "Success", message: "User registered successfully.."})

    } catch (error) {
        return res.json({ status: "error", message: error })
    }

}
