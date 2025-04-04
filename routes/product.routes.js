const { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct } = require("../controllers/product.controller");
const authGuard = require("../middleware/guards/auth.guard");
const ownerGuard = require("../middleware/guards/owner.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", authGuard,ownerGuard, addProduct);
router.get("/", authGuard, ownerGuard, getAllProducts);
router.get("/:id", authGuard, ownerGuard, getProductById);
router.delete("/:id", authGuard, ownerGuard, deleteProduct);
router.put("/:id", authGuard, ownerGuard, updateProduct);

module.exports = router;
