import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsBySeller,
  searchProducts,
  updateProduct,
} from "../controller/product.controller.js";
const router = express.Router();

router.route("/products").post(createProduct).get(getProducts);
router.get("/products/search", searchProducts);
router.get("/products/seller/:userId", getProductsBySeller);
router.route("/product/:productId").patch(updateProduct).delete(deleteProduct)

export default router;
