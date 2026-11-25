const CategoryService = require("../services/categories.service");

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;

      const category = await this.categoryService.createCategory(
        name,
        description,
      );

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getAllCategories = async (req, res) => {
    try {
      const categories = await this.categoryService.getAllCategories();

      res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;

      const category = await this.categoryService.getCategoryById(id);

      res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await this.categoryService.updateCategory(
        id,
        name,
        description,
      );

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const category = await this.categoryService.deleteCategory(req.params.id);
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  statusChange = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const category = await this.categoryService.statusChange(id, status);

      res.status(200).json({
        success: true,
        message: "Category status changed successfully",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = CategoryController;
