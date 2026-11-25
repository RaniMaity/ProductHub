
const express = require("express");
const BrandController = require("../controller/brands.controller");

const router = express.Router();
const control = new BrandController();

router.post("/", control.createBrand);

router.get("/", control.getAllBrands);

router.get("/:id", control.getBrandById);

router.put("/:id", control.updateBrand);

router.patch("/:id/status", control.statusChange);

router.delete("/:id", control.deleteBrand);

module.exports = router;
