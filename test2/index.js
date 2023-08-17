import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { Login, Register, getCurrentUser } from './controllers/UserControllers.js';
import { addProduct, allProducts, getYourProducts, updateProduct } from './controllers/Product.conroller.js';
import { checkSeller } from './Middleware/Seller.middleware.js';


const app = express();
app.use(express.json());
dotenv.config();

app.post('/', (req, res) => {
    res.send("Working....")
})

app.post('/register', Register)

app.post('/login', Login)

app.post('/get-current-user', getCurrentUser)

app.post('/add-product',checkSeller, addProduct)

app.get('/all-products', allProducts)

app.get('/getyour-products', checkSeller, getYourProducts)

app.patch('/update-product', checkSeller, updateProduct)





mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Connected to Db")
}).catch((error) => {
    console.log("Error in connecting mongoDb", error)
})

app.listen(8000, ()=> {
    console.log("Server running on port 8000")
})