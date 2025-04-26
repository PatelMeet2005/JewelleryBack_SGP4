import { contactUs } from "../Models/contactUs.js";

export const contactUser = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const addcontact = new contactUs({ name, email, subject, message });
        await addcontact.save();

        return res.status(200).json({ status: "Success", message: "Your Query Saved Successfully!" });

    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
};
