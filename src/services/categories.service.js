const Category=require("../models/categories.model")
const AppError = require("../utils/AppError");

class CategoryService {
  constructor() {}

  createCategory = async (name, description) => {
    console.log("create category data coming", name, description);

    const exists = await Category.findOne({ name });
    if (exists) {
      throw new AppError("Category already exists", 400);
    }

    const category = await Category.create({
      name,
      description,
    });

    return category;
  };


  getAllCategories = async () => {
    const categories = await Category.find();

    return categories;
  };


  getCategoryById = async (id) => {
    const category = await Category.findById(id);

    if (!category) {
      throw new AppError("Category does not exist", 400);
    }

    return category;
  };

  updateCategory = async (id, name, description) => {
    // Check duplicate category name
    const exists = await Category.findOne({
      name,
      _id: { $ne: id },
    });

    if (exists) {
      throw new AppError("Category already exists", 400);
    }

    const category = await Category.findByIdAndUpdate( id,{ name, description, },
      {
        new: true, runValidators: true,
      },
    );

    if (!category) {
      throw new AppError("Category does not exist", 400);
    }

    return category;
  };


  deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new AppError("Category does not exist", 400);
    }

    return category;
  };

  
  statusChange = async (id, status) => {
    const category = await Category.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      },
     
    );

    return category;
  };
}

module.exports = CategoryService;
