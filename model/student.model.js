const mongoose = require('mongoose')
const Schema = mongoose.Schema


const studentSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    rollNo:{
        type:String,
        required: true
    },
    mobileNo:{
        type:String,
        required: true
    },
    classId:{
        type:String
    }
}

)


const Student = mongoose.model('Student', studentSchema);

module.exports = Student