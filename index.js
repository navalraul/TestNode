import express from 'express';
import mongoose from 'mongoose';
import { Login, Register } from './controllers/User.controller.js';

const app = express();


app.get("/", function (req, res) {
    res.send("Working..")
})

app.get("/login",Login)

app.get("/register",Register)


mongoose.connect("mongodb+srv://test:test123@cluster0.k0bgc2r.mongodb.net/Naval")
.then(()=> {
    console.log("Connected to Db")
}).catch((error) => {
    console.log("Error in connecting mongoDb", error)
})

app.listen(8000, ()=> {
    console.log("Server running on port 8000")
})