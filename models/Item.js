//models/Item.js
/**
 * @type {*|Mongoose}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    id: {type: Number},
    qr: {type: Number},
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required : true},
    quantity: {type: Number, required : true},
    url: {type: String}
});

module.exports = mongoose.model('Item', itemSchema);