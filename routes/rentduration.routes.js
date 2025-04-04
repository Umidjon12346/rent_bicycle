const { addRentDuration, getAllRentDurations, getRentDurationById, deleteRentDuration, updateRentDuration } = require("../controllers/rentduration.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");

const router = require("express").Router();

router.post("/", authGuard,userAdminGuard, addRentDuration);
router.get("/", authGuard, getAllRentDurations);
router.get("/:id", authGuard, getRentDurationById);
router.delete("/:id", authGuard, userAdminGuard, deleteRentDuration);
router.put("/:id", authGuard,userAdminGuard, updateRentDuration);

module.exports = router;
