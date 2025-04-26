import express from "express";
import upload from "../FileFolder/multerConfig.js";
import { addProductController ,getProductController ,updateProductController ,deleteProductController} from "../Controllers/addProductController.js";

const router = express.Router();

router.post("/addProduct", upload.fields([{name:'productImage',maxCount: 1}]), addProductController);
router.get("/getProduct", getProductController);

// Update product route
router.put("/updateProduct/:id", upload.fields([{ name: 'productImage', maxCount: 1 }]), updateProductController);

// Delete product route
router.delete("/deleteProduct/:id", deleteProductController);

export default router;

