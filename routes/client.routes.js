const { addClient, getAllClients, getClientById, deleteClient, updateClient } = require("../controllers/client.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", authGuard, userAdminGuard, addClient);
router.get("/", authGuard, userAdminGuard, getAllClients);
router.get("/:id", authGuard, userSelfGuard, getClientById);
router.delete("/:id", authGuard, userAdminGuard, deleteClient);
router.put("/:id", authGuard, userSelfGuard, updateClient);
router.post("/login", loginUser);
router.post("/refresh", refreshTokenUser);
router.post("/logout", logoutUser);

module.exports = router;
