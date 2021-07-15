const express = require("express")
const router = express.Router()
const app = express()

const nutritionController = require("../controllers/nutritionController")
const verificationUser = require("../middleware/verification")
const verificationAdmin = require("../middleware/verificationAdmin")

router.get("/", nutritionController.listAll)
router.get("/search", verificationUser, nutritionController.search)
//the following three should use get and the middleware - commented by Hao
// Because there is no such a middleware to support both users and admins can access the API.
// Now they can only be accessed by normal users. - commented by Arthur
router.get("/show_id", verificationUser, nutritionController.showNutritionByID)
router.get("/show_description", verificationUser, nutritionController.showNutritionByDescription)
router.get("/load_icon", verificationUser, nutritionController.loadIcon)

router.delete("/delete", verificationAdmin, nutritionController.removeByID)
router.post("/add", verificationAdmin, nutritionController.addNutrition)
router.post("/update", verificationAdmin, nutritionController.update)
router.post("/assign", verificationAdmin, nutritionController.assign)

module.exports = router
