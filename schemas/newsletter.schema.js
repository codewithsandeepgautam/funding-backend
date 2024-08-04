const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsLetterSchema = new Schema({
    email:{
        type : String,
        required : true
    }
},{timestamps :true});

const NewsLetter = mongoose.model('NewsLetter', newsLetterSchema);
module.exports = NewsLetter;