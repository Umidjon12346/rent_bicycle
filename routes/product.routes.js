const { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct, getMyProducts } = require("../controllers/product.controller");
const authGuard = require("../middleware/guards/auth.guard");
const ownerGuard = require("../middleware/guards/owner.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");
const Product = require("../models/product.model");


const router = require("express").Router();

router.post("/", authGuard, addProduct);
router.get("/", authGuard, getAllProducts);

router.get("/my_product",authGuard,ownerGuard,getMyProducts)
router.get("/:id", authGuard, ownerGuard,ownerSelfGuard(Product), getProductById);
router.delete("/:id", authGuard, ownerGuard, deleteProduct);
router.put("/:id", authGuard, ownerGuard, updateProduct);

module.exports = router;
