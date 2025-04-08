const { addCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory } = require("../controllers/category.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");
const Category = require("../models/category.model");

const router = require("express").Router();

router.post("/", authGuard, userAdminGuard, addCategory);
router.get("/", authGuard, getAllCategories);
router.get("/:id", authGuard, getCategoryById);
router.delete("/:id", authGuard, userAdminGuard, deleteCategory);
router.put("/:id", authGuard, userAdminGuard, updateCategory);

module.exports = router;
