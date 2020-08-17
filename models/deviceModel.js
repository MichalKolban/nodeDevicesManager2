const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    },
    price: {
        type: Number,
        required: false,
        default: 99
    },
    imgString: {
       type: String,
       required: false 
    }
})

module.exports = mongoose.model('Device', deviceSchema)