import { addProduct } from "../Models/addProduct.js";


export const addProductController = async (req, res) => {
  try {
    const { productName, productPrice, productCategory, productDescription, productWeight ,productMetal,productPurity} = req.body;

    const productImage = req.files?.productImage?.[0]?.path || '';

    if (!productImage) {
      return res.status(400).json({ status: "error", message: "Product image is required." });
    }

    const addProductData = new addProduct({
      productName,
      productPrice,
      productCategory,
      productImage,
      productDescription,
      productWeight,
      productMetal,
      productPurity
    });

    await addProductData.save();

    return res.status(200).json({ status: "Success", message: "Product Added Successfully!" });

  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};



export const getProductController = async (req, res) => {
    try {
      const products = await addProduct.find(); // Fetch all products
  
      const updatedProducts = products.map(product => ({
        ...product.toObject(),
        productImage: product.productImage ? `${req.protocol}://${req.get('host')}/${product.productImage}` : ''
      }));
  
      return res.status(200).json({ status: "Success", data: updatedProducts });
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message });
    }
  };

  export const updateProductController = async (req, res) => {
    try {
      const { id } = req.params;
      const { productName, productPrice, productCategory, productDescription, productWeight, productMetal, productPurity } = req.body;
  
      // Check if the product exists
      const product = await addProduct.findById(id);
      if (!product) {
        return res.status(404).json({ status: "error", message: "Product not found." });
      }
  
      // Update the product
      const updatedProduct = await addProduct.findByIdAndUpdate(id, {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productWeight,
        productMetal,
        productPurity,
        productImage: req.files?.productImage?.[0]?.path || product.productImage, // If no image uploaded, keep old image
      }, { new: true });
  
      return res.status(200).json({ status: "success", message: "Product updated successfully!", data: updatedProduct });
  
    } catch (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ status: "error", message: err.message });
    }
  };
  

  export const deleteProductController = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the product exists
      const product = await addProduct.findById(id);
      if (!product) {
        return res.status(404).json({ status: "error", message: "Product not found." });
      }
  
      // Delete the product
      await addProduct.findByIdAndDelete(id);
  
      return res.status(200).json({ status: "success", message: "Product deleted successfully!" });
    } catch (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ status: "error", message: err.message });
    }
  };
  
  
