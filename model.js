const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    
    cuisine: String,
    title: String,
    rating: Number,
    prep_time:Number,
    cook_time:Number,
    total_time:Number,
    description:String,
    nutrients: Object,
    serves:String

});

const model = mongoose.model('model', schema);
module.exports = model;
