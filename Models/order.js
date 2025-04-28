import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    product: { type: Object, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

export { Order };
