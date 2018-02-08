//models/Item.js
/**
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    qr: Number,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    url: String
});

module.exports = mongoose.model('Item', itemSchema);