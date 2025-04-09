const { addLocation, getAllLocations, getLocationById, deleteLocation, updateLocation } = require("../controllers/location.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const Location = require("../models/location.model");
const clientGuard = require("../middleware/guards/client.guard");

const router = require("express").Router();

router.post("/", authGuard, addLocation);
router.get("/", authGuard, getAllLocations);
router.get("/client/:id", authGuard,clientGuard, userSelfGuard(Location),  getLocationById);
router.get("/:id", authGuard, getLocationById);

router.delete("/:id", authGuard, userAdminGuard, deleteLocation);
router.put("/:id", authGuard,  updateLocation);

module.exports = router;
