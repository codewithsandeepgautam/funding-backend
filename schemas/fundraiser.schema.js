const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundsSchema = new Schema({
    name: {
       type : String,
       required : true,
    },
    email: { type: String, required: true },
    phoneNumber: {
        type: String,
        required : true,
    },
    fundsUsed:{
        type: String,
        required : true,
    },
    hospitalStatus:{
        type : String,
        required : true,
    },
},{timestamps:true});

const Fundraiser = mongoose.model('Fundraiser', fundsSchema);

module.exports = Fundraiser;