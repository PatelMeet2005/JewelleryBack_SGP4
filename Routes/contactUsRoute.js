import express from "express";
import { contactUser } from "../Controllers/contactUsController.js";

const router = express.Router();

router.post("/contactUs", contactUser);

export default router;