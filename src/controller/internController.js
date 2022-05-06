const InternModel = require('../models/Intern Model')
const mongoose = require('mongoose');
const CollegeModel = require('../models/College Model');
//const isValidObjectId = (objectId) => { return mongoose.Types.ObjectId.isValid(objectId) };



const createIntern = async function (req, res) {
    try {
        let data = req.body
        
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data is required" })
       // let regex = /^[a-zA-Z]{2,30}$/
        let mobileregex = /^[6-9]\d{9}$/
        let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!data.name) {
            return res.status(400).send({ status: false, message: "KINDLY ADD name" })
        }
        if (!data.email) {
            return res.status(400).send({ status: false, message: "KINDLY ADD email" })
        }
        if (!data.mobile) {
            return res.status(400).send({ status: false, message: "KINDLY ADD mobile" })
        }
        //  if (!data.collegeId) { return res.status(400).send({ status: false, message: "KINDLY ADD collegeId" }) }
        if (!data.collegeName) {
            return res.status(400).send({ status: false, message: "KINDLY ADD collegeName" })
        }
        //REGEX VALIDATIONS
       // if (!data.name.match(regex)) {
          //  return res.status(400).send({ status: false, message: "NAME SHOULD ONLY CONTAIN ALPHABETS AND LENGTH MUST BE IN BETWEEN 2-30" })
        //}
        if (!data.mobile.match(mobileregex)) {
            return res.status(400).send({ status: false, message: "MOBILE NO. SHOULD BE IN VALID FORMAT" })
        }
        if (!data.email.match(emailregex)) {
            return res.status(400).send({ status: false, message: "EMAIL SHOULD BE IN VALID FORMAT" })
        }
        if (data.isDeleted == true) {
            return res.status(400).send({ status: false, message: "CANT DELETE BEFORE CREATION" })
        }
        //let intern = await InternModel.findOne({ name: data.name, email: data.email, mobile: data.mobile })
        // if (intern) {
        //     if (intern.collegeId == data.collegeId) {
            // return res.status(400).send({ status: false, message: "You have already applied for this college" }) }
        // }
        
        let duplicate = await InternModel.findOne({ email: data.email })
        if (duplicate) { return res.status(400).send({ status: false, message: "EMAIL ALREADY EXISTS" }) }
        let duplicateNumber = await InternModel.findOne({ mobile: data.mobile })
        if (duplicateNumber) return res.status(400).send({ status: false, message: "MOBILE NUMBER ALREADY EXISTS" })
        //if (!isValidObjectId(data.collegeId)) {
        // return res.status(400).send({ status: false, message: "NOT A VALID COLLEGE ID" })
        // }
        let college = await CollegeModel.findOne({ name: data.collegeName ,isDeleted:false})
        if (!college) {
            return res.status(404).send({ status: false, message: "NO SUCH COLLEGE IS PRESENT" })
        }
        // if (college.isDeleted == true) {
        //     return res.status(404).send({ status: false, message: "COLLEGE IS DELETED" })
        // }
        let Intern = { name: data.name, email: data.email, mobile: data.mobile, collegeId: college._id, isDeleted: data.isDeleted }
        let saved = await InternModel.create(Intern)
        let find = await InternModel.findOne({name:data.name,email:data.email}).select({name:1, email:1,mobile:1,collegeId:1,isDeleted:1,_id:0})
        res.status(201).send({ status: true, data:find })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const getList = async function (req, res) {
    try {

        const data = req.query.collegeName

        if (!data) {
            return res.status(400).send({ status: false, message: "SHOULD GIVE ANY QUERY" })
        }
        const getData = await CollegeModel.findOne({ name: data })
        if (!getData) {
            return res.status(404).send({ status: false, message: "NO SUCH COLLEGE IS PRESENT" })
        }
        if (getData.isDeleted == true) {
            return res.status(404).send({ status: false, message: "THE COLLEGE YOU ARE TRYING TO ENTER IS DELETED" })
        }

        const Intern1 = await InternModel.find({ collegeId: getData._id })

        if (Intern1.length == 0) {
            return res.status(404).send({ status: false, message: "NO INTERN HAS APPLIED FOR THIS COLLEGE" })
        }

        // for (let i = 0; i < Intern1.length; i++) {

        //     if (Intern1[i].isDeleted == false) {

        let Intern = Intern1.filter(x => x.isDeleted == false)
        if (Intern.length == 0) {
            return res.status(404).send({ status: false, message: "ALL INTERNS ARE DELETED" })
        }

        const Intern2 = await InternModel.find({ collegeId: getData._id, isDeleted: false }).select({ name: 1, mobile: 1, email: 1 })

        // const College = await CollegeModel.findOne({ name: data, isDeleted: false })
        // let collegeDetails = { name: College.name, fullName: College.fullName, logoLink: College.logoLink, interns: Intern2 }
        let collegeDetails = { name: getData.name, fullName:getData.fullName, logoLink: getData.logoLink,isDeleted:getData.isDeleted, interests: Intern2 }
        return res.status(200).send({ status: true, data: collegeDetails})
    }
    // else return res.status(400).send({ status: false, message: "Intern is deleted" })}


    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createIntern, getList }

