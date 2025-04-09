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
  registerOwner,
  updatePassword,
} = require("../controllers/owner.controller");

const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const Owner = require("../models/owner.model");
const ownerGuard = require("../middleware/guards/owner.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");

const router = require("express").Router();

router.post("/",authGuard,userAdminGuard, addOwner);
router.get("/", authGuard, userAdminGuard, getAllOwners);
router.post("/update_pass",authGuard,updatePassword)
router.get("/:id", authGuard,  getOwnerById);
router.delete("/:id", authGuard, userAdminGuard, deleteOwner);
router.put("/:id", authGuard,ownerGuard, ownerSelfGuard(Owner), updateOwner);


router.post("/login", loginOwner);
router.get("/activate/:link", ownerActive);
router.post("/refresh", refreshTokenOwner);
router.post("/logout", logoutOwner);
router.post("/register",registerOwner)

module.exports = router;
