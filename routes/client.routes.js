const {
  addClient,
  getAllClients,
  getClientById,
  deleteClient,
  updateClient,
  loginClient,
  clientActive,
  refreshTokenClient,
  logoutClient,
  registerClient,
} = require("../controllers/client.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const Client = require("../models/client.model");
const clientGuard = require("../middleware/guards/client.guard");

const router = require("express").Router();

router.post("/", addClient);
router.get("/", authGuard, userAdminGuard, getAllClients);
router.get("/activate/:link", clientActive);
router.get("/:id", authGuard, clientGuard, userSelfGuard(Client), getClientById);
router.delete("/:id", authGuard, userAdminGuard, deleteClient);
router.put("/:id", authGuard, userSelfGuard(Client), updateClient);
router.post("/login", loginClient);
router.post("/refresh", refreshTokenClient);
router.post("/logout", logoutClient);
router.post("/register",registerClient)

module.exports = router;
