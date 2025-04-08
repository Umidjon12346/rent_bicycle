const { addAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, refreshTokenAdmin } = require("../controllers/admin.controller");
const adminSelfGuard = require("../middleware/guards/admin.self.guard");
const authGuard = require("../middleware/guards/auth.guard");
const is_creatorGuard = require("../middleware/guards/is_creator.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");

const router = require("express").Router();

router.post("/",authGuard, addAdmin);
router.get("/", authGuard, is_creatorGuard, getAllAdmins);
router.get("/:id", authGuard, userAdminGuard,adminSelfGuard, getAdminById);
router.delete("/:id", authGuard, is_creatorGuard, deleteAdmin);
router.put("/:id", authGuard, userAdminGuard,adminSelfGuard, updateAdmin);



router.post("/login", loginAdmin);
router.post("/refresh", refreshTokenAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;
