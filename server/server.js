/**
 * Created by danielghandahari on 2018-01-23.
 */
//server/server.js
const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const Item = require('../models/Item');

var mongoose = require ("mongoose");
var router = require('./routes/routes.js');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    description: {type: String, required: true},
    price: {type: Number, required : true}
});
//  type: heroku config:get MONGODB_URI
//  You can add mLab to your app either through the add-on catalog or through the heroku command.
//  https://devcenter.heroku.com/articles/mongolab
var uristring = 'mongodb://heroku_6dn4h73b:co8pe58sjmurt19g8t7ddd7vef@ds111618.mlab.com:11618/heroku_6dn4h73b';

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();
const dev = app.get('env') !== 'production';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
        Item.create({
            description: 'cola',
            price: 100,
        });
        Item.find({}, 'description', function(err, items){
            if (err){
                console.log(err);
            }
            else{
                console.log(items);
            }
        })
    }
});



if(!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));

    app.use(express.static(path.resolve(__dirname, 'build')));

    app.get('/', (req, res) => {
        res.send("HEEEEJ")
    });

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })

}

if(dev) {
    app.use(morgan('dev'));

}

const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err;

    console.log('Server started!');
});
