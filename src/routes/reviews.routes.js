const express = require("express");
const ReviewController = require("../controller/reviews.controller");

const router = express.Router();
const control = new ReviewController();

router.post("/", control.createReview);

router.get("/", control.getAllReviews);

router.get("/approved", control.getApprovedReviews);

router.get("/pending", control.getPendingReviews);

router.get("/rejected", control.getRejectedReviews);

router.get("/product/:productId", control.getReviewsByProductId);

router.get("/user/:userId", control.getReviewsByUserId);

router.get("/:id", control.getReviewById);

router.put("/:id", control.updateReview);

router.patch("/:id/status", control.statusChange);

router.delete("/:id", control.deleteReview);

module.exports = router;
