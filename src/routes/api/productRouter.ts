import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../handlers/product.handler";

import {validateTokenMiddleware} from"../../middlewares/authenrication.middleware"

const productRouter = express.Router();

// Create a new product
productRouter.post("/",validateTokenMiddleware, createProduct);

// Get a product by ID
productRouter.get("/:product_id", getProductById);

// Get all products
productRouter.get("/", getAllProducts);

// Update a product by ID
productRouter.put("/:product_id", updateProduct);

// Delete a product by ID
productRouter.delete("/:product_id",validateTokenMiddleware, deleteProduct);

export default productRouter;
