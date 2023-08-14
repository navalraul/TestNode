import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(express.json())



mongoose.connect("mongodb+srv://test:test123@cluster0.k0bgc2r.mongodb.net/Naval")
.then(()=> {
    console.log("Connected to Db")
}).catch((error) => {
    console.log("Error in connecting mongoDb", error)
})

app.listen(8000, ()=> {
    console.log("Server running on port 8000")
})