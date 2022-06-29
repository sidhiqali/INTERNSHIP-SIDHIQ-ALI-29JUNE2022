const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    standard:{
        type:Number,
    },
    division:{
        type:String,
    },
 
}
)

module.exports = mongoose.model('Class',classSchema)