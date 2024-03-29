import express from 'express';
import mongoose from 'mongoose';
// import { Login, Register } from './controllers/User.controller.js';
import User from './Models/User.Models.js'

const app = express();
app.use(express.json());


app.get("/", function (req, res) {
    res.send("Working..")
})

app.get("/login", function (req, res) {
    res.send("Login from code")
})

app.post("/register", async function (req, res) {
    console.log(req.body, "req.body")

    const { name, surname, age, email, number, password, confirmPassword} = req.body;
    if(!name) return res.send("Name is required..");
    if(!age) return res.send("Age is required..");
    if(!surname) return res.send("Surname is required..");
    if(!email) return res.send("Email is required..");
    if(!number) return res.send("Number is required..");
    if(!password) return res.send("Password is required..");
    if(!confirmPassword) return res.send("Confirm Password is required..");
    if (password !== confirmPassword ) return res.send("Password and ConfirmPassword not matched...")

    const user = new User ({
        name: name,
        surname: surname, 
        age: parseInt(age), 
        email: email, 
        number: parseInt(number), 
        password: password,
        confirmPassword: confirmPassword
    })

    await user.save()

    res.send("Registered done...")
})

app.get('/find', async (req, res) => {

    const { email } = req.body;
    if(!email) return res.send("Email is required")

    const user = await User.find({email: email }).select("-password -number")

    if(user.length) {
        return res.send(user[0])
    }
    return res.send("No user found")
})

app.patch('/update/:id', async (req, res) => {
    const { age, number} = req.body;
    const {id} = req.params;

    if(!id) return res.send("Id is required..")
    if(!age) return res.send("age is required..")
    if(!number) return res.send("number is required..")

    const updatedUser = await User.findByIdAndUpdate(id, {age, number}, {new: true})
    return res.json({ message: "Data updated..", data: updatedUser})
})

app.delete('/delete', async function(req, res) {
    const { id, name } = req.query;
    if (!id) return res.send("Id is required")

    const deletedUser = await User.findByIdAndDelete(id)
    return res.json({ message: "User defined", data: deletedUser})
})


mongoose.connect("mongodb+srv://test:test123@cluster0.k0bgc2r.mongodb.net/Naval")
.then(()=> {
    console.log("Connected to Db")
}).catch((error) => {
    console.log("Error in connecting mongoDb", error)
})

app.listen(8000, ()=> {
    console.log("Server running on port 8000")
})