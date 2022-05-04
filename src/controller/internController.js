const InternModel = require('../models/Intern Model')
const mongoose=require('mongoose')
const isValidObjectId = (objectId) => { return mongoose.Types.ObjectId.isValid(objectId)};



const createIntern = async function(req,res){
    try{
    let data = req.body
    let regex = /^[a-zA-Z ]{2,30}$/
    let mobileregex=/^[0]?[6789]\d{9}$/ 
        let emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        if(!data.name){res.status(400).send({status:false,message:"KINDLY ADD name"})}
        if(!data.email){res.status(400).send({status:false,message:"KINDLY ADD email"})}
        if(!data.mobile){res.status(400).send({status:false,message:"KINDLY ADD mobile"})}
        if(!data.collegeId){res.status(400).send({status:false,message:"KINDLY ADD collegeId"})}
        //REGEX VALIDATIONS
        if (!data.name.match(regex)) return res.status(400).send({ status: false, message: "NAME SHOULD ONLY CONTAIN ALPHABETS AND LENGTH MUST BE IN BETWEEN 2-30" })
        if (!data.mobile.match(mobileregex)) return res.status(400).send({ status: false, message: "MOBILE SHOULD BE OF 10 DIGITS" })
        if (!data.email.match(emailregex)) return res.status(400).send({ status: false, message: "EMAIL SHOULD BE IN VALID FORMAT" })
        if (!isValidObjectId(data.collegeId)) {
            return res.status(400).send({status:false,message:"NOT A VALID COLLEGE ID"})}
            let duplicate = await InternModel.findOne({email:data.email})
            if(duplicate){return res.status(400).send({status:false,message:"EMAIL ALREADY EXISTS"})}
    let saved = await InternModel.create(data)
    res.status(201).send({status:true,data:saved})
}
catch(error){
    res.status(500).send({status:false,message:error.message})
}}
module.exports.createIntern=createIntern