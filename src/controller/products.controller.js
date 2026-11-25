
const ProductService = require("../services/products.service");

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    // Create Product
    createProduct = async (req, res) => {
        try {
            const {
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
            } = req.body;

            const product = await this.productService.createProduct(
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
            );

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get All Products
    getAllProducts = async (req, res) => {
        try {
            const products = await this.productService.getAllProducts();

            res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                count: products.length,
                data: products
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get Product By ID
    getProductById = async (req, res) => {
        try {
            const { id } = req.params;

            const product = await this.productService.getProductById(id);

            res.status(200).json({
                success: true,
                message: "Product fetched successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get Complete Product Details
    getProductDetails = async (req, res) => {
        try {
            const { id } = req.params;

            const product = await this.productService.getProductDetails(id);

            res.status(200).json({
                success: true,
                message: "Complete product details fetched successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get All Products With Reviews
    getAllProductsWithReviews = async (req, res) => {
        try {
            const products = await this.productService.getAllProductsWithReviews();

            res.status(200).json({
                success: true,
                message: "Products with reviews fetched successfully",
                count: products.length,
                data: products
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get Product Reviews
    getProductReviews = async (req, res) => {
        try {
            const { id } = req.params;

            const reviews = await this.productService.getProductReviews(id);

            res.status(200).json({
                success: true,
                message: "Product reviews fetched successfully",
                data: reviews
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Update Product
    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;

            const {
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
            } = req.body;

            const product = await this.productService.updateProduct(
                id,
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
            );

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Delete Product
    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;

            const product = await this.productService.deleteProduct(id);

            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Update Product Stock
    updateProductStock = async (req, res) => {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            const product = await this.productService.updateProductStock(
                id,
                stock
            );

            res.status(200).json({
                success: true,
                message: "Product stock updated successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Update Product Price
    updateProductPrice = async (req, res) => {
        try {
            const { id } = req.params;
            const { price, originalPrice } = req.body;

            const product = await this.productService.updateProductPrice(
                id,
                price,
                originalPrice
            );

            res.status(200).json({
                success: true,
                message: "Product price updated successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Change Product Status
    statusChange = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const product = await this.productService.statusChange(
                id,
                status
            );

            res.status(200).json({
                success: true,
                message: "Product status changed successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Featured Product
    featuredProduct = async (req, res) => {
        try {
            const { id } = req.params;

            const product = await this.productService.featuredProduct(id);

            res.status(200).json({
                success: true,
                message: "Product marked as featured successfully",
                data: product
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = ProductController;
