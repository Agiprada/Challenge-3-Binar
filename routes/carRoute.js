const express = require("express")
const carController = require("../controllers/carsController")
const router = express.Router()

router
    .route("/")
    .get(carController.getAllData)
    .post(carController.createData)

router
    .route("/:id")
    .get(carController.getDataById)
    .patch(carController.editData)
    .delete(carController.deleteData)

module.exports = router
