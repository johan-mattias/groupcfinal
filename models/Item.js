//models/Item.js
/**
 * @type {*|Mongoose}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    description: {type: String, required: true},
    price: {type: Number, required : true}
});

module.exports = mongoose.model('Item', itemSchema);