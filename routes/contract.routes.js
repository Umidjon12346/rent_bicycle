const { addContract, getAllContracts, getContractById, deleteContract, updateContract, getRentedProducts, getCancelledClients, getDamagedClients, getTopOwnersByCategory } = require("../controllers/contracts.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const Contract = require("../models/contracts.model");
const clientGuard = require("../middleware/guards/client.guard");

const router = require("express").Router();

router.post("/", authGuard,clientGuard, addContract);
router.get("/", authGuard,userAdminGuard, getAllContracts);

router.get("/rented",authGuard, getRentedProducts);   ///// filterdagi 1-cisiiiiii
router.get("/damaged",  getDamagedClients); //// 2-chisi 
router.get("/cancelled",  getCancelledClients); ///// filterdagi 3 -chisiiiiii
router.get("/top-owners",getTopOwnersByCategory);


router.get("/:id", authGuard,userSelfGuard(Contract), getContractById);
router.delete("/:id", authGuard, userAdminGuard,deleteContract );
router.put("/:id", authGuard,userAdminGuard, updateContract);


module.exports = router;
