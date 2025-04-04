const { addPayment, getAllPayments, getPaymentById, deletePayment, updatePayment } = require("../controllers/payment.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", authGuard, addPayment);
router.get("/", authGuard,userSelfGuard, getAllPayments);
router.get("/:id", authGuard,userSelfGuard, getPaymentById);
router.delete("/:id", authGuard, userAdminGuard, deletePayment);
router.put("/:id", authGuard,userAdminGuard, updatePayment);

module.exports = router;
