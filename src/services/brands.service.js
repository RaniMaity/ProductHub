
const Brand = require("../models/brands.model");
const AppError = require("../utils/AppError");

class BrandService {
    constructor() {

    }

    createBrand = async (name, description, officialWebsite, countryOfOrigin) => {

        console.log("create brand data coming", name, description, officialWebsite, countryOfOrigin);

   
        const exists = await Brand.findOne({ name });

        if (exists) {
            throw new AppError("Brand already exists", 400);
        }

        const brand = await Brand.create({
            name,
            description,
            officialWebsite,
            countryOfOrigin
        });

        return brand;
    };

    // Get All Brands
    getAllBrands = async () => {

        const brands = await Brand.find();

        return brands;
    };

    // Get Brand By ID
    getBrandById = async (id) => {

        const brand = await Brand.findById(id);

        if (!brand) {
            throw new AppError("Brand does not exist", 400);
        }

        return brand;
    };


    updateBrand = async (id, name, description, officialWebsite, countryOfOrigin) => {

        
        const exists = await Brand.findOne({
            name,
            _id: { $ne: id }
        });

        if (exists) {
            throw new AppError("Brand already exists", 400);
        }

        const brand = await Brand.findByIdAndUpdate(
            id,
            {
                name,
                description,
                officialWebsite,
                countryOfOrigin
            },
            {
                new: true,
                runValidators: true
            }
        );

      
        return brand;
    };

  
    deleteBrand = async (id) => {

        const brand = await Brand.findByIdAndDelete(id);

        if (!brand) {
            throw new AppError("Brand does not exist", 400);
        }

        return brand;
    };


    statusChange = async (id, status) => {

        const brand = await Brand.updateOne(
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

      
    };
}

module.exports = BrandService;
