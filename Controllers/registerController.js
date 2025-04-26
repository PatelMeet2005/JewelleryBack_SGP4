import { Register } from "../Models/register.js"; // note: model name should match the export
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createAdmin = async () => {
    const adminExists = await Register.findOne({userEmail : "admin@gmail.com"});
    
    if(!adminExists){
        const hashedpassword = await bcrypt.hash("admin", 10);
        const newAdmin = new Register({
            userFirstName : "Admin",
            userLastName : "Portal",
            userEmail : "admin@gmail.com",
            userPassword : hashedpassword,
            role : "Admin"
        });
        await newAdmin.save();
        console.log("Admin Created!");
    }
}
createAdmin();

export const registerUser = async (req, res) => {
    try {
        const { userFirstName, userLastName, userEmail, userPassword } = req.body;

        // 2. Check if email already exists
        const existingUser = await Register.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "Email already exists" });
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // 4. Create and save new user
        const newUser = new Register({
            userFirstName,
            userLastName,
            userEmail,
            userPassword: hashedPassword,
        });

        await newUser.save();

        // 5. Create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token,
        });

    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
};
