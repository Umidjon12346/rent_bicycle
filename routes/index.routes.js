const router = require("express").Router();

const adminRoute = require("./admin.routes")
const cardRoute = require("./card.routes")
const clientRoute = require("./client.routes")
const contractRoute = require("./contract.routes")
const locationRoute = require("./location.routes")
const ownerRoute = require("./owner.routes")
const paymemtRoute = require("./payment.routes")
const productRoute = require("./product.routes")
const rentDurationRoute = require("./rentduration.routes")
const reviewRoute = require("./review.routes")
const statusRoute = require("./status.routes")
const categoryRoute = require("./category.routes")


router.use("/admin",adminRoute)
router.use("/card",cardRoute)
router.use("/client",clientRoute)
router.use("/contract",contractRoute)
router.use("/location",locationRoute)
router.use("/owner",ownerRoute)
router.use("/payment",paymemtRoute)
router.use("/product",productRoute)
router.use("/rentdura",rentDurationRoute)
router.use("/review",reviewRoute)
router.use("/status",statusRoute)
router.use("/category",categoryRoute)

module.exports = router