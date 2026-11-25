const ReviewService = require("../services/reviews.service");

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  createReview = async (req, res) => {
    try {
      const { product, user, rating, title, description } = req.body;

      const review = await this.reviewService.createReview(
        product,
        user,
        rating,
        title,
        description,
      );

      res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: review,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

 
  getAllReviews = async (req, res) => {
    try {
      const reviews = await this.reviewService.getAllReviews();

      res.status(200).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  
  getReviewById = async (req, res) => {
    try {
      const { id } = req.params;

      const review = await this.reviewService.getReviewById(id);

      res.status(200).json({
        success: true,
        message: "Review fetched successfully",
        data: review,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };


  updateReview = async (req, res) => {
    try {
      const { id } = req.params;
      const { rating, title, description } = req.body;

      const review = await this.reviewService.updateReview(
        id,
        rating,
        title,
        description,
      );

      res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: review,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };


  deleteReview = async (req, res) => {
    try {
      const { id } = req.params;

      const review = await this.reviewService.deleteReview(id);

      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
        data: review,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Get Reviews By Product ID
  getReviewsByProductId = async (req, res) => {
    try {
      const { productId } = req.params;

      const reviews = await this.reviewService.getReviewsByProductId(productId);

      res.status(200).json({
        success: true,
        message: "Product reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Get Reviews By User ID
  getReviewsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;

      const reviews = await this.reviewService.getReviewsByUserId(userId);

      res.status(200).json({
        success: true,
        message: "User reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Get Approved Reviews
  getApprovedReviews = async (req, res) => {
    try {
      const reviews = await this.reviewService.getApprovedReviews();

      res.status(200).json({
        success: true,
        message: "Approved reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Get Pending Reviews
  getPendingReviews = async (req, res) => {
    try {
      const reviews = await this.reviewService.getPendingReviews();

      res.status(200).json({
        success: true,
        message: "Pending reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Get Rejected Reviews
  getRejectedReviews = async (req, res) => {
    try {
      const reviews = await this.reviewService.getRejectedReviews();

      res.status(200).json({
        success: true,
        message: "Rejected reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Change Review Status
  statusChange = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const review = await this.reviewService.statusChange(id, status);

      res.status(200).json({
        success: true,
        message: "Review status changed successfully",
        data: review,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = ReviewController;
