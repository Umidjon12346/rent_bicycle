const { addPayment, getAllPayments, getPaymentById, deletePayment, updatePayment, getClientPayments } = require("../controllers/payment.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const clientGuard = require("../middleware/guards/client.guard");
const Payment = require("../models/payment.model");

const router = require("express").Router();

router.post("/", authGuard,clientGuard, addPayment);
router.get("/", authGuard,userAdminGuard, getAllPayments);

router.get("/client-payments",authGuard,clientGuard, getClientPayments);

router.get("/:id", authGuard,clientGuard,userSelfGuard(Payment), getPaymentById);
router.delete("/:id", authGuard, userAdminGuard, deletePayment);
router.put("/:id", authGuard,userAdminGuard, updatePayment);

module.exports = router;
