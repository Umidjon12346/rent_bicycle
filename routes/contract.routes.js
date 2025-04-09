const { addContract, getAllContracts, getContractById, deleteContract, updateContract, getRentedProducts, getCancelledClients, getDamagedClients, getTopOwnersByCategory, getAllMyContractsForOwner, getAllMyContracts } = require("../controllers/contracts.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const Contract = require("../models/contracts.model");
const clientGuard = require("../middleware/guards/client.guard");
const ownerGuard = require("../middleware/guards/owner.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");

const router = require("express").Router();

router.post("/", authGuard,clientGuard, addContract);
router.get("/", authGuard,userAdminGuard, getAllContracts);

router.get("/rented",authGuard, getRentedProducts);   ///// filterdagi 1-cisiiiiii
router.get("/damaged",authGuard,  getDamagedClients); //// 2-chisi 
router.get("/cancelled",authGuard,  getCancelledClients); ///// filterdagi 3 -chisiiiiii
router.get("/top-owners",authGuard, getTopOwnersByCategory);

router.get("/owner_contract",authGuard,ownerGuard,getAllMyContractsForOwner)
router.get("/client_contract",authGuard,clientGuard,getAllMyContracts)

router.get("/:id", authGuard,clientGuard,userSelfGuard(Contract), getContractById);
router.get("/owner_contract/:id", authGuard,ownerGuard,ownerSelfGuard(Contract), getContractById);
router.delete("/:id", authGuard, userAdminGuard,deleteContract );
router.put("/:id", authGuard,userAdminGuard, updateContract);


module.exports = router;
