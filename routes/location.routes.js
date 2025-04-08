const { addLocation, getAllLocations, getLocationById, deleteLocation, updateLocation } = require("../controllers/location.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/client.self.guard");
const Location = require("../models/location.model");

const router = require("express").Router();

router.post("/", authGuard, addLocation);
router.get("/", authGuard, getAllLocations);
router.get("/:id", authGuard,userSelfGuard(Location),  getLocationById);
router.delete("/:id", authGuard, userAdminGuard, deleteLocation);
router.put("/:id", authGuard,  updateLocation);

module.exports = router;
