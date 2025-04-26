import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productCategory: { type: String, required: true },
    productWeight: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productImage: { type: String, required: true },
    productMetal: { type: String, required: true },
    productPurity: { type: String, required: true },
    });

const addProduct = mongoose.model('productDetail', productSchema, 'productDetail');
export { addProduct };