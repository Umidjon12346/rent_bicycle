const { addOwner, getAllOwners, getOwnerById, deleteOwner, updateOwner, ownerActive } = require("../controllers/owner.controller");

const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/",  addOwner);
router.get("/", authGuard, userAdminGuard, getAllOwners);
router.get("/activate/:link", ownerActive);
router.get("/:id", authGuard, userSelfGuard, getOwnerById);
router.delete("/:id", authGuard, userAdminGuard, deleteOwner);
router.put("/:id", authGuard, userSelfGuard, updateOwner);
// router.post("/login", loginUser);
// router.post("/refresh", refreshTokenUser);
// router.post("/logout", logoutUser);

module.exports = router;
