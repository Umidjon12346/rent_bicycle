const { addCard, getCardById, getAllCards, deleteCard, updateCard } = require("../controllers/card.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", authGuard, userSelfGuard, addCard);
router.get("/", authGuard,userSelfGuard, getAllCards);
router.get("/:id", authGuard,userSelfGuard, getCardById);
router.delete("/:id", authGuard, userSelfGuard, deleteCard);
router.put("/:id", authGuard, userSelfGuard, updateCard);

module.exports = router;
