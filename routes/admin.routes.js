const { addAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } = require("../controllers/admin.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", authGuard, addAdmin);
router.get("/", authGuard, userAdminGuard, getAllAdmins);
router.get("/:id", authGuard, userSelfGuard, getAdminById);
router.delete("/:id", authGuard, userAdminGuard, deleteAdmin);
router.put("/:id", authGuard, userSelfGuard, updateAdmin);
// router.post("/login", loginUser);
// router.post("/refresh", refreshTokenUser);
// router.post("/logout", logoutUser);

module.exports = router;
