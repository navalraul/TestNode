import mongoose, {Schema} from "mongoose";

const useSchema = new Schema ({
    name: {
        type : String,
        required: true,
        unique: true
    },
    surname: {
        type : String,
        required: true
    },
    age: {
        type : Number,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    number: {
        type : Number,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

export default mongoose.model("User", useSchema)