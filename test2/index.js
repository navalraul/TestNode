import express from 'express';
import mongoose from 'mongoose';
import { Login, Register } from './controllers/UserControllers.js';


const app = express();
app.use(express.json())

app.post('/', (req, res) => {
    res.send("Working....")
})

app.post('/register', Register)

app.post('/login', Login)



mongoose.connect("mongodb+srv://test:test123@cluster0.k0bgc2r.mongodb.net/Naval2")
.then(()=> {
    console.log("Connected to Db")
}).catch((error) => {
    console.log("Error in connecting mongoDb", error)
})

app.listen(8000, ()=> {
    console.log("Server running on port 8000")
})