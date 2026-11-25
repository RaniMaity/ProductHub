
const BrandService = require("../services/brands.service");

class BrandController {
    constructor() {
        this.brandService = new BrandService();
    }


    createBrand = async (req, res) => {
        try {
            const {
                name,
                description,
                officialWebsite,
                countryOfOrigin
            } = req.body;

            const brand = await this.brandService.createBrand(
                name,
                description,
                officialWebsite,
                countryOfOrigin
            );

            res.status(201).json({
                success: true,
                message: "Brand created successfully",
                data: brand
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get All Brands
    getAllBrands = async (req, res) => {
        try {
            const brands = await this.brandService.getAllBrands();

            res.status(200).json({
                success: true,
                message: "Brands fetched successfully",
                data: brands
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Get Brand By ID
    getBrandById = async (req, res) => {
        try {
            const { id } = req.params;

            const brand = await this.brandService.getBrandById(id);

            res.status(200).json({
                success: true,
                message: "Brand fetched successfully",
                data: brand
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Update Brand
    updateBrand = async (req, res) => {
        try {
            const { id } = req.params;

            const {
                name,
                description,
                officialWebsite,
                countryOfOrigin
            } = req.body;

            const brand = await this.brandService.updateBrand(
                id,
                name,
                description,
                officialWebsite,
                countryOfOrigin
            );

            res.status(200).json({
                success: true,
                message: "Brand updated successfully",
                data: brand
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Delete Brand
    deleteBrand = async (req, res) => {
        try {
            const { id } = req.params;

            const brand = await this.brandService.deleteBrand(id);

            res.status(200).json({
                success: true,
                message: "Brand deleted successfully",
                data: brand
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    // Change Brand Status
    statusChange = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const brand = await this.brandService.statusChange(id, status);

            res.status(200).json({
                success: true,
                message: "Brand status changed successfully",
                data: brand
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = BrandController;
