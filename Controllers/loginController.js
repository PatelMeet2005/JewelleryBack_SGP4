// Controllers/loginController.js
import { Register } from "../Models/register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Check if user exists
        const existingUser = await Register.findOne({ userEmail });
        if (!existingUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(userPassword, existingUser.userPassword);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: "error", message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token
        });

    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
};
