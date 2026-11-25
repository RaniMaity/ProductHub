const Review = require("../models/reviews.model.js");
const Product = require("../models/products.model.js");
const User = require("../models/users.model.js");
const AppError = require("../utils/AppError");

class ReviewService {
  constructor() {}

  createReview = async (product, user, rating, title, description) => {
    console.log(
      "create review data coming",
      product,
      user,
      rating,
      title,
      description,
    );

    const productExist = await Product.findById(product);

    if (!productExist) {
      throw new AppError("Product does not exist", 400);
    }
    const userExist = await User.findById(user);

    if (!userExist) {
      throw new AppError("User does not exist", 400);
    }

    const review = await Review.create({
      product,
      user,
      rating,
      title,
      description,
    });

    const response = await Review.findById(review._id)
      .populate("product")
      .populate("user");

    return response;
  };

  getAllReviews = async () => {
    const reviews = await Review.find().populate("product").populate("user");

    return reviews;
  };

  getReviewById = async (id) => {
    const review = await Review.findById(id)
      .populate("product")
      .populate("user");

    if (!review) {
      throw new AppError("Review does not exist", 400);
    }

    return review;
  };

  updateReview = async (id, rating, title, description) => {
    const review = await Review.findByIdAndUpdate(
      id,
      {
        rating,
        title,
        description,
      },
      { new: true, runValidators: true },
    )
      .populate("product")
      .populate("user");

    if (!review) {
      throw new AppError("Review does not exist", 400);
    }

    return review;
  };

  deleteReview = async (id) => {
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      throw new AppError("Review does not exist", 400);
    }

    return review;
  };

  // 	Retrieve reviews of a particular product
  getReviewsByProductId = async (productId) => {
    const reviews = await Review.find({
      product: productId,
    }).populate("user");

    return reviews;
  };

  //Retrieve reviews submitted by a particular user
  getReviewsByUserId = async (userId) => {
    const reviews = await Review.find({
      user: userId,
    }).populate("product");

    return reviews;
  };

  //   Retrieve all approved reviews
  getApprovedReviews = async () => {
    const reviews = await Review.find({
      status: "approved",
    })
      .populate("product")
      .populate("user");

    return reviews;
  };

  // Get Pending Reviews
  getPendingReviews = async () => {
    const reviews = await Review.find({
      status: "pending",
    })
      .populate("product")
      .populate("user");

    return reviews;
  };

  // Get Rejected Reviews
  getRejectedReviews = async () => {
    const reviews = await Review.find({
      status: "rejected",
    })
      .populate("product")
      .populate("user");

    return reviews;
  };

  // Change Review Status
  statusChange = async (id, status) => {
    const review = await Review.updateOne(
      { _id: id },
      {
        $set: {
          status: status,
        },
      },
    );
    return review;
  };
}

module.exports = ReviewService;
