const { addCard, getCardById, getAllCards, deleteCard, updateCard, getMyCards } = require("../controllers/card.controller");
const authGuard = require("../middleware/guards/auth.guard");
const userAdminGuard = require("../middleware/guards/user.admin.guard");

const Card = require("../models/card.model");
const clientGuard = require("../middleware/guards/client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");

const router = require("express").Router();

router.post("/", authGuard,clientGuard, addCard);
router.get("/", authGuard,userAdminGuard, getAllCards);
router.get("/client_card", authGuard, clientGuard, getMyCards);
router.get("/:id", authGuard, clientGuard, clientSelfGuard(Card), getCardById);
router.delete("/:id", authGuard, clientGuard, clientSelfGuard(Card), deleteCard);
router.put("/:id", authGuard, clientGuard, clientSelfGuard(Card), updateCard);

module.exports = router;
