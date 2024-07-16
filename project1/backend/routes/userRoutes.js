import express from "express";
import { check, getEachProduct, getSpecificProducts } from "../controllers/controller.js";

const router=express.Router();

router.route("/").get(check);
router.route("/categories/:categoryname/products").get(getEachProduct);
router.route("/categories/:categoryname/products/: productid").get(getSpecificProducts);

export default router;