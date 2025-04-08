const { addReview, getAllReviews, getReviewById, deleteReview, updateReview } = require("../controllers/review.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");

const router = require("express").Router();

router.post("/", authGuard, addReview);
router.get("/", authGuard, getAllReviews);
router.get("/:id", authGuard, getReviewById);
router.delete("/:id", authGuard, userAdminGuard,userSelfGuard, deleteReview);
router.put("/:id", authGuard,userSelfGuard, updateReview);

module.exports = router;
