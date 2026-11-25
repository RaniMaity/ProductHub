
const express = require("express");
const categoryController = require("../controller/categories.controller");

const router = express.Router();
const control = new categoryController();

router.post("/", control.createCategory);

router.get("/", control.getAllCategories);

router.get("/:id", control.getCategoryById);

router.put("/:id", control.updateCategory);

router.patch("/:id/status", control.statusChange);

router.delete("/:id", control.deleteCategory);

module.exports = router;
