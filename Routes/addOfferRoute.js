import express from "express";
import { addOfferController, getOfferController, updateOfferController, deleteOfferController } from "../Controllers/addOfferController.js";

const router = express.Router();

router.post("/addOffer", addOfferController);
router.get("/getOffers", getOfferController);
router.put("/updateOffer/:id", updateOfferController);
router.delete("/deleteOffer/:id", deleteOfferController);

export default router;
