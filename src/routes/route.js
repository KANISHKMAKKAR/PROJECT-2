const express = require('express');
const router = express.Router();
const collegeController= require("../controller/collegeController")

router.get("/testme", function(req, res){
    res.send({msg:"hi"})
})

router.post("/functionup/colleges", collegeController.createCollege)

module.exports = router