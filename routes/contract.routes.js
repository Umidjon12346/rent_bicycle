const { addContract, getAllContracts, getContractById, deleteContract, updateContract } = require("../controllers/contracts.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const Contract = require("../models/contracts.model");

const router = require("express").Router();

router.post("/", authGuard, addContract);
router.get("/", authGuard, getAllContracts);
router.get("/:id", authGuard,userSelfGuard(Contract), getContractById);
router.delete("/:id", authGuard, userAdminGuard,deleteContract );
router.put("/:id", authGuard,userAdminGuard, updateContract);

module.exports = router;
