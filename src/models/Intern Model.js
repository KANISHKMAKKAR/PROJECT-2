const mongoose=require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const InternSchema = new mongoose.Schema(
    {
        name: {type:String,required:true}, 
        email: {type:String, unique:true,required:true}, 
        mobile: {type:Number,  required:true, unique:true,maxlength:10,minlength:10}, 
        collegeId: {
            type:ObjectId,
            ref:"College"},
             isDeleted: {type:Boolean, default: false}
    }
)
module.exports = mongoose.model('Intern', InternSchema)