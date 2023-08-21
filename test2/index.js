import express from 'express';
// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Login, Register, getCurrentUser } from './controllers/UserControllers.js';
import { addComments, addProduct, addRating, allProducts, deleteYourProduct, getYourProducts, updateProduct } from './controllers/Product.conroller.js';
import { checkIsAdmin, checkSeller, isCheckValidUser } from './Middleware/All.middleware.js';
import { addCart, addWhislist,  deleteCartProduct, getCartProducts, getWhislist } from './controllers/Buyer.controller.js';
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnverifiedProducts, getVerifiedProducts, unBlockUser, unblockProduct, verifyProduct } from './controllers/Admin.controller.js';


const app = express();
app.use(express.json());
dotenv.config();

app.post('/', (req, res) => {
    res.send("Working....")
})

app.post('/register', Register)

app.post('/login', Login)

app.post('/add-cart', addCart)

app.get('/get-cart-products', getCartProducts)

app.delete('/delete-cart-product',checkSeller, deleteCartProduct)

app.post('/add-whislist', addWhislist)

app.get('/get-whislist', getWhislist)

app.post('/get-current-user', getCurrentUser)

app.post('/add-product',checkSeller, addProduct)

app.get('/all-products', allProducts)

app.get('/getyour-products', checkSeller, getYourProducts)

app.patch('/update-product', checkSeller, updateProduct)

app.delete('/delete-your-product', checkSeller, deleteYourProduct)

///admin

app.get("/get-all-buyers", checkIsAdmin, getAllBuyers);
app.get("/get-all-sellers", checkIsAdmin, getAllSellers);
app.get("/get-all-products", checkIsAdmin, getAllProducts);

app.patch("/block-user", checkIsAdmin, blockUser);
app.patch("/unblock-user", checkIsAdmin, unBlockUser);
app.patch("/block-product", checkIsAdmin, blockProduct);
app.patch("/unblock-product", checkIsAdmin, unblockProduct);
app.patch("/verify-product", checkIsAdmin, verifyProduct);
app.get("/get-verified-products", checkIsAdmin, getVerifiedProducts);
app.get("/get-unverified-products", checkIsAdmin, getUnverifiedProducts);
app.get("/get-blocked-products", checkIsAdmin, getBlockedProducts);


app.patch("/add-rating", isCheckValidUser, addRating);
app.patch("/add-comment", isCheckValidUser, addComments);



mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Connected to Db")
}).catch((error) => {
    console.log("Error in connecting mongoDb", error)
})

app.listen(8000, ()=> {
    console.log("Server running on port 8000")
})