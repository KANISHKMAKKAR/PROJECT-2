const CollegeModel = require("../models/College Model")


 const createCollege = async function (req, res){
 

    const requestBody= req.body
    let name= req.body.name
    let fullName = req.body.fullName
    let logoLink= req.body.logoLink
  if (!Object.keys(requestBody).length===0) return res.status(400).send({status:false, message:"Data is required"})
  if(!name) return res.status(400).send({status:false, message:"name is required"})
  if(!fullName) return res.status(400).send({status:false, message:"fullName is required"})

  const createData = await CollegeModel.create(requestBody)
  res.status(201).send({status:true, data:createData})
 }


 module.exports.createCollege=createCollege