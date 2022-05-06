const express = require('express');
const router = express.Router();
const collegeController = require("../controller/collegeController")
const internController = require('../controller/internController')


router.post("/colleges", collegeController.createCollege)
router.post("/interns", internController.createIntern)
router.get("/collegeDetails", internController.getList)

module.exports = router