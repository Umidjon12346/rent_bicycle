const { addAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, refreshTokenAdmin } = require("../controllers/admin.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", addAdmin);
router.get("/", authGuard, userAdminGuard, getAllAdmins);
router.get("/:id", authGuard, userAdminGuard, getAdminById);
router.delete("/:id", authGuard, userAdminGuard, deleteAdmin);
router.put("/:id", authGuard, userAdminGuard, updateAdmin);
router.post("/login", loginAdmin);
router.post("/refresh", refreshTokenAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;
