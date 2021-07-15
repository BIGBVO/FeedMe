const express = require("express")
const router = express.Router()

const categoryController = require("../controllers/categoryController")
const verificationAdmin = require("../middleware/verificationAdmin")

//no middleware? how can we secure the api calls then? - commented by Hao
router.get("/", categoryController.list)
//why not use get? we are not changing anything in the database with this api call - commented by Hao
router.post("/show", categoryController.show)

router.post("/create", verificationAdmin, categoryController.createCategory)

module.exports = router
