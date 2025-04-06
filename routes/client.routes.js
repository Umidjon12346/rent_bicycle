const { addClient, getAllClients, getClientById, deleteClient, updateClient, loginClient, clientActive } = require("../controllers/client.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/",  addClient);
router.get("/", authGuard, userAdminGuard, getAllClients);
router.get("/activate/:link",clientActive );
router.get("/:id", authGuard, userSelfGuard, getClientById);
router.delete("/:id", authGuard, userAdminGuard, deleteClient);
router.put("/:id", authGuard, userSelfGuard, updateClient);
router.post("/login", loginClient);
// router.post("/refresh", refreshTokenUser);
// router.post("/logout", logoutUser);

module.exports = router;
