const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema(
    {
         name: { 
             type:String,
             required:true,
             unique:true,
             trim:true
            }, 
        fullName: { 
            type:String,
            required:true,
            trim:true 
        },
         logoLink: {
             type:String,
            required:true,
            trim:true
         },
         isDeleted: { 
             type:Boolean, 
             default: false 
            } 
    }
)
module.exports = mongoose.model('College', CollegeSchema)
