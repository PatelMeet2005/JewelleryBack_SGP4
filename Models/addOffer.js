import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discount: { type: Number, required: true },
    description: { type: String, required: true },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'productDetail', // <-- Linking to productDetail collection
        required: true 
    },
}, { timestamps: true });

const Offer = mongoose.model('offerDetail', offerSchema, 'offerDetail');

export { Offer };
