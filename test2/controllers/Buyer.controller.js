import ProductModal from "../Modals/Product.modal.js";
import UserModals from "../Modals/User.modals.js";
import jwt from 'jsonwebtoken';


export const addCart =async (req, res) => {
    try{
        const { token, productId} = req.body;
        if(!token || !productId) throw new Error("Token and ProductId required..")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModals.findById({_id: userId})

        user?.cart.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user})

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getCartProducts = async (req, res) => {
    try{
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModals.findById(userId)

        if( user) {
            var finalData = [];
            for(var i = 0; i<user.cart.length; i++) {

                const product = await ProductModal.findById(user.cart[i])
                if(product){
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, product: finalData})
        }
        throw new Error("User not found")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const deleteCartProduct = async (req, res) => {
    try{

        const {token, productId}= req.body;

        if(!productId || !token) return res.status(404).json({ status: "error", message: "ProductId is required...."})
        // console.log(productId)

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not found..."})
        }
        const userId = decodedData.userId;
        
        const user = await UserModals.findById({ _id: userId})

        const cart = user.cart
        const removeItem = cart.indexOf(productId)
        cart.splice(removeItem, 1)

        await user.save();

        return res.status(200).json({ success: true, message: "Product deleted..."})

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}


export const addWhislist = async(req, res) => {
    try{

        const { token, productId } = req.body;
        if(!token || !productId) throw new Error("Token and ProductId required....")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModals.findById({_id: userId})

        user?.whislist.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getWhislist = async (req, res) => {
    try{

        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModals.findById(userId);

        if(user) {
            var finalData = [];
            for(var i = 0; i< user.whislist.length; i++) {
                // console.log(user.whislist[i])
                const product = await ProductModal.findById(user.whislist[i])
                if(product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, products: finalData })
        }

        throw new Error("User not found.")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}