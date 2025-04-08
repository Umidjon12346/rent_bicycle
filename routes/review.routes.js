const { addReview, getAllReviews, getReviewById, deleteReview, updateReview } = require("../controllers/review.controller");
const adminSelfGuard = require("../middleware/guards/admin.self.guard");
const authGuard = require("../middleware/guards/auth.guard");
const clientGuard = require("../middleware/guards/client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const Review = require("../models/review.model");


const router = require("express").Router();

router.post("/", authGuard, addReview);
router.get("/", authGuard, getAllReviews);
router.get("/:id", authGuard,clientGuard,clientSelfGuard(Review), getReviewById);
router.delete("/:id", authGuard,clientGuard, clientSelfGuard(Review), deleteReview);
router.put("/:id", authGuard, clientSelfGuard(Review), updateReview);


/////// For Admins //////-------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/get-id-review/:id", authGuard, userAdminGuard,getReviewById);
router.delete("/delete-review/:id", authGuard, userAdminGuard,deleteReview);
router.put("/update-review/:id", authGuard, userAdminGuard,updateReview);


module.exports = router;
