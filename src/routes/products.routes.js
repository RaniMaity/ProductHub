const express = require("express");
const ProductController = require("../controller/products.controller");

const router = express.Router();
const control = new ProductController();

router.post("/", control.createProduct);

router.get("/", control.getAllProducts);

router.get("/with-reviews", control.getAllProductsWithReviews);

router.get("/:id/details", control.getProductDetails);

router.get("/:id/reviews", control.getProductReviews);

router.get("/:id", control.getProductById);

router.put("/:id", control.updateProduct);

router.patch("/:id/stock", control.updateProductStock);

router.patch("/:id/price", control.updateProductPrice);

router.patch("/:id/status", control.statusChange);

router.patch("/:id/featured", control.featuredProduct);

router.delete("/:id", control.deleteProduct);

module.exports = router;
