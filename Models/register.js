import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    role : { type: String, default: "user" },
}, { timestamps: true }); 

const Register = mongoose.model('Register', RegisterSchema);

export { Register };
