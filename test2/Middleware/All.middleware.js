import UserModals from "../Modals/User.modals.js";
import jwt from "jsonwebtoken";

export const checkSeller = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const user = await UserModals.findById(userId);

        if (!user || user?.role != "Seller") {
            return res.status(404).json({ message: "User not valid to add product from middleware.", status: "error" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error" })
    }
}

export const checkIsAdmin = async (req, res, next) => {
    try {

        const { token } = req.body;
        // console.log(token)

        if (!token)
            return res
                .status(404)
                .json({ success: false, message: "Token is required!" });

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        
        if (!decodedData)
            return res
                .status(404)
                .json({ status: "error", message: "Not a valid token!" });

                // console.log(decodedData)
        const userId = decodedData.userId;

        // console.log(userId)

        const user = await UserModals.findById(userId);

        // console.log(user)
        if(!user || user?.role != "Admin") {
            return res.status(404).json({ message: "User not a admin.", status: "error" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error not defined" })
    }
}


export const isCheckValidUser = async (req, res, next) => {
    try {

        const { token } = req.body;
        if (!token)
            return res
                .status(404)
                .json({ success: false, message: "Token is required!" });

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData)
            return res
                .status(404)
                .json({ success: false, message: "Not a valid token!" });

        const userId = decodedData.userId;

        const user = await UserModals.findById(userId);

        console.log(user);

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not valid!" });
        }

        next();


    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error" })
    }
}