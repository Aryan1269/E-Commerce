const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        minlength:[2,'too short'],
        maxlength:[32,'too large'],
        required : true,
        unique: true,
    },
    slug : {
        type : String,
        unique:true,
        lowercase: true,
        index : true,
    }
},{timestamps:true});

module.exports = mongoose.model('Category',Category);