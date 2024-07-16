import express from "express";
import {
    check,
    getAll,
    getEachProduct,
    getSpecificProducts,
} from "../controllers/controller.js";

const router = express.Router();

router.route("/").get(check);
router.route("/all").get(getAll);
router.route("/categories/:categoryname/products").get(getEachProduct);
router.route("/categories/:categoryname/products/:productid").get(getSpecificProducts);

export default router;