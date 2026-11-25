const Product = require("../models/products.model");
const Category = require("../models/categories.model");
const Brand = require("../models/brands.model");
const Review = require("../models/reviews.model");
const AppError = require("../utils/AppError");

class ProductService {
    constructor() {

    }

   
    createProduct = async (name, description, sku, price, originalPrice, color, sizes, stock, category, brand) => {

        console.log("create product data coming", name, description, sku, price, originalPrice, color, sizes, stock, category, brand);

        // Check duplicate SKU
        const exists = await Product.findOne({
            sku: sku.trim()
        });

        if (exists) {
            throw new AppError("Product SKU already exists", 400);
        }


        const categoryExist = await Category.findById(category);

        if (!categoryExist) {
            throw new AppError("Category does not exist", 400);
        }


        const brandExist = await Brand.findById(brand);

        if (!brandExist) {
            throw new AppError("Brand does not exist", 400);
        }


        const product = await Product.create({
            name,
            description,
            sku,
            price,
            originalPrice,
            color,
            sizes,
            stock,
            category,
            brand
        });

        const response = await Product.findById(product._id)
            .populate("category")
            .populate("brand");

        return response;
    };

    // Get All Products with Category and Brand
    getAllProducts = async () => {

        const products = await Product.find()
            .populate("category")
            .populate("brand");

        return products;
    };

   
    getProductById = async (id) => {

        const product = await Product.findById(id)
            .populate("category")
            .populate("brand");

        if (!product) {
            throw new AppError("Product does not exist", 400);
        }

        return product;
    };

   // Get Complete Product Details
    getProductDetails = async (id) => {

        const product = await Product.findById(id)
            .populate("category")
            .populate("brand");

        if (!product) {
            throw new AppError("Product does not exist", 400);
        }

        const reviews = await Review.find({
            product: id
        }).populate("user");

        const response = {
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                sku: product.sku,
                price: product.price,
                originalPrice: product.originalPrice,
                color: product.color,
                sizes: product.sizes,
                stock: product.stock,
                category: product.category,
                brand: product.brand,
                status: product.status,
                isFeatured: product.isFeatured,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                reviews: reviews
            }
        };

        return response;
    };

    // Get All Products with Category, Brand and Reviews
    getAllProductsWithReviews = async () => {

        const products = await Product.find()
            .populate("category")
            .populate("brand");

        const productList = [];

        for (const product of products) {

            const reviews = await Review.find({
                product: product._id
            }).populate("user");

            productList.push({
                _id: product._id,
                name: product.name,
                description: product.description,
                sku: product.sku,
                price: product.price,
                originalPrice: product.originalPrice,
                color: product.color,
                sizes: product.sizes,
                stock: product.stock,
                category: product.category,
                brand: product.brand,
                status: product.status,
                isFeatured: product.isFeatured,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                reviews: reviews
            });
        }

        return productList;
    };

    // Get Reviews By Product ID
    getProductReviews = async (id) => {

        const productExist = await Product.findById(id);

        if (!productExist) {
            throw new AppError("Product does not exist", 400);
        }

        const reviews = await Review.find({
            product: id
        }).populate("user");

        return reviews;
    };


    updateProduct = async (id, name, description, sku, price, originalPrice, color, sizes, stock, category, brand) => {

        // Check duplicate SKU
        const exists = await Product.findOne({
            sku: sku.trim(),
            _id: { $ne: id }
        });

        if (exists) {
            throw new AppError("Product SKU already exists", 400);
        }


        const categoryExist = await Category.findById(category);

        if (!categoryExist) {
            throw new AppError("Category does not exist", 400);
        }


        const brandExist = await Brand.findById(brand);

        if (!brandExist) {
            throw new AppError("Brand does not exist", 400);
        }

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                sku,
                price,
                originalPrice,
                color,
                sizes,
                stock,
                category,
                brand
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        .populate("category")
        .populate("brand");

        if (!product) {
            throw new AppError("Product does not exist", 400);
        }

        return product;
    };

    deleteProduct = async (id) => {

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new AppError("Product does not exist", 400);
        }

        return product;
    };


    updateProductStock = async (id, stock) => {

        const product = await Product.updateOne(
            { _id: id },
            {
                $set: {
                    stock: stock
                }
            },
            {
                runValidators: true
            }
        );


        return product;
    };


    updateProductPrice = async (id, price, originalPrice) => {

        const product = await Product.updateOne(
            { _id: id },
            {
                $set: {
                    price: price,
                    originalPrice: originalPrice
                }
            },
            {
                runValidators: true
            }
        );



        return product;
    };


    statusChange = async (id, status) => {

        const product = await Product.updateOne(
            { _id: id },
            {
                $set: {
                    status: status
                }
            },
            {
                runValidators: true
            }
        );



        return product;
    };

    featuredProduct = async (id) => {

        const product = await Product.updateOne(
            { _id: id },
            {
                $set: {
                    isFeatured: true
                }
            }
        );

        return product;
    };

}

module.exports = ProductService;