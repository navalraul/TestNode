import ProductModal from "../Modals/Product.modal.js";
import jwt from 'jsonwebtoken';
// import UserModals from "../Modals/User.modals.js";

export const addProduct = async( req, res) => {

    try{
        const {name, price, image, category, token} = req.body;

        if (!name || !price || !image || !category || !token) return res.status(404).json({ status: "error", message: "All fields are mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const product = new ProductModal({ name, price, image, category, userId: userId });

        // const product = new ProductModal({ name, price, image, category });
        await product.save();

        return res.status(201).json({ status: "Sucess" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const allProducts = async(req, res) => {
    try{
        const products = await ProductModal.find({});
        if(products.length) {
            return res.status(201).json({ status: "Success", products: products})
        }
        return res.status(404).json({status: "error", message: "No products found"})
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getYourProducts = async(req, res) => {
    try{

        const {token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const getYourProducts = await ProductModal.find({ userId: userId})

        if(getYourProducts.length) {
            return res.status(200).json({ status: "success", products: getYourProducts})
        }
         return res.status(404).json({ status: "error", message: "No products found"})

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const updateProduct= async(req, res)=> {
    try{

        const { productId, name, image, price, category, token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const updatedProduct = await ProductModal.findOneAndUpdate({ _id: productId, userId: userId }, { name, image, price, category }, { new: true })

        if (updatedProduct) {
            return res.status(200).json({ status: "Sucess", product: updatedProduct })
        }
        return res.status(404).json({ status: "error", message: "You are trying to update product which is not yours.." })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}


export const deleteYourProduct = async (req, res)=> {
    try{

        const{productId, token} = req.body;

        if(!productId) return res.status(404).json({status: "error", message: "Product id is mandatory.."})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData.userId

        const isDeleted = await ProductModal.findOneAndDelete({ _id: productId, userId: userId})
        if(isDeleted) {
            return res.status(200).json({ success: true, message: "Product deleted successfully...."})
        }

        throw new Error("Mongodb error")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}