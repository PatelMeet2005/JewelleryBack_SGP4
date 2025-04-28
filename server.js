import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import contactUsRoute from "./Routes/contactUsRoute.js";
import addProductRoute from "./Routes/addProductRoute.js";
import registerRoute from "./Routes/registerRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import addOfferRoute from "./Routes/addOfferRoute.js";
import orderRoute from "./Routes/orderRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({extended:true}));

app.use("/api",contactUsRoute);
app.use('/uploads', express.static('uploads'));

app.use("/admin",addProductRoute);

app.use("/user",registerRoute);

app.use("/user",loginRoute);

app.use("/admin",addOfferRoute);

app.use("/api/orders",orderRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})