//server/routes/routes.js
//code inspired by https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3
//https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
//https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3

//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Item = require('../../models/Item');
const app = express();
const router = express.Router();
//const url = 'mongodb://heroku_6dn4h73b:co8pe58sjmurt19g8t7ddd7vef@ds111618.mlab.com:11618/heroku_6dn4h73b';
const url = 'mongodb://armanv:OVtDy6R9ZgnYI3qZ5IUZB@ds117158.mlab.com:17158/scrubit';


//=========================//


router.get('/hej', function(req, res){
    res.send("hejsannnn");
});

router.get('/get-all', function(req, res) {
    Item.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

// Description and Price will be inputs used by app
router.post('/insert', function(req, res) {
    Item.create({
        id: req.body.Id,
        qr: req.body.Qr,
        name: req.body.Name,
        description: req.body.Description,
        price: req.body.Price,
        quantity: req.body.Quantity,
        url: req.body.Url
    }).then(item => {
        res.json(item)
    });
});

router.post('/update-price', function (req, res) {
    Item.find({
        description: req.body.Name
    }, function (err, res) {
        res.id = req.body.Id;
        res.qr = req.body.Qr;
        res.name = req.body.Name;
        res.description = req.body.Description;
        res.price = req.body.Price;
        res.quantity = req.body.Quantity;
        res.url = req.body.Url;
    });
});


router.post('/delete', function(req, res){
    Item.find({
        description: req.body.Name
    }, function(err, docs){
        docs.remove();
    });
});


module.exports = router;
