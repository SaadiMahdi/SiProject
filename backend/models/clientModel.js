const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true,'please anter your name'],
       trim: true,
       lowercase: true
     },
    address:{
        type: String,
        required: [true,'please anter your address'],
        trim: true,
        lowercase: true
    },
    phone:{
        type: Number,
        required: [true,'please anter your phone number'],
    },
    credit:{
        type: Number,
        default:0,
    }
})


module.exports = mongoose.model('client',clientSchema);

