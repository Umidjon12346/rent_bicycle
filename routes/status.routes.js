const { addStatus, getAllStatuses, getStatusById, deleteStatus, updateStatus } = require("../controllers/status.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");


const router = require("express").Router();

router.post("/", authGuard,userAdminGuard, addStatus);
router.get("/", authGuard,userAdminGuard, getAllStatuses);
router.get("/:id", authGuard, getStatusById);
router.delete("/:id", authGuard, userAdminGuard, deleteStatus);
router.put("/:id", authGuard,userAdminGuard, updateStatus);

module.exports = router;
