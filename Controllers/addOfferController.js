import { Offer } from "../Models/addOffer.js";

// Add Offer
export const addOfferController = async (req, res) => {
  try {
    const { title, discount, description, productId } = req.body;

    if (!title || !discount || !description || !productId) {
      return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    const newOffer = new Offer({
      title,
      discount,
      description,
      productId,
    });

    await newOffer.save();

    return res.status(200).json({ status: "Success", message: "Offer added successfully!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// Get All Offers
export const getOfferController = async (req, res) => {
  try {
    const offers = await Offer.find().populate('productId'); // Populate product details

    return res.status(200).json({ status: "Success", data: offers });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// Update Offer
export const updateOfferController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, discount, description, productId } = req.body;

    const offer = await Offer.findById(id);
    if (!offer) {
      return res.status(404).json({ status: "error", message: "Offer not found." });
    }

    const updatedOffer = await Offer.findByIdAndUpdate(id, {
      title,
      discount,
      description,
      productId,
    }, { new: true });

    return res.status(200).json({ status: "Success", message: "Offer updated successfully!", data: updatedOffer });
  } catch (err) {
    console.error('Error updating offer:', err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// Delete Offer
export const deleteOfferController = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findById(id);
    if (!offer) {
      return res.status(404).json({ status: "error", message: "Offer not found." });
    }

    await Offer.findByIdAndDelete(id);

    return res.status(200).json({ status: "Success", message: "Offer deleted successfully!" });
  } catch (err) {
    console.error('Error deleting offer:', err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};
