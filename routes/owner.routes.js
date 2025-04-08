const {
  addOwner,
  getAllOwners,
  getOwnerById,
  deleteOwner,
  updateOwner,
  ownerActive,
  loginOwner,
  refreshTokenOwner,
  logoutOwner,
  getTopRentingOwnersByCategory,
  mostActiveOwnersByCategory,
  registerOwner,
} = require("../controllers/owner.controller");

const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");

const router = require("express").Router();

router.post("/", addOwner);
router.get("/", authGuard, userAdminGuard, getAllOwners);
router.get("/activate/:link", ownerActive);
router.get("/top-owner/:categoryId", getTopRentingOwnersByCategory);
router.get("/:id", authGuard, userSelfGuard, getOwnerById);
router.delete("/:id", authGuard, userAdminGuard, deleteOwner);
router.put("/:id", authGuard, userSelfGuard, updateOwner);
router.post("/login", loginOwner);
router.post("/refresh", refreshTokenOwner);
router.post("/logout", logoutOwner);
router.post("/register",registerOwner)

module.exports = router;
