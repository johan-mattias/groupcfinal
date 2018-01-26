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
var Item = require('../../models/Item');
const app = express();
var router = require('./routes/routes.js')
const url = 'mongodb://heroku_6dn4h73b:co8pe58sjmurt19g8t7ddd7vef@ds111618.mlab.com:11618/heroku_6dn4h73b';

//=========================//


router.get('/', function(req, res){
    res.render('index')
});

router.get('/get-all', function(req, res) {
    Item.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

// Description and Price will be inputs used by app
router.post('/insert', function(req, res) {
    Item.create({
        description: req.body.Description,
        price: req.body.Price,
    }).then(item => {
        res.json(item)
    });
});

router.post('/update-price', function (req, res) {
    Item.find({
        description: req.body.Description
    }, function (err, res) {
        res.description = req.body.Description;
        res.price = req.body.Price;
    });
});


router.get('/delete', function(req, res){
    Item.find({
        description: req.body.Description
    }, function(err, docs){
        docs.remove();
    });
});


module.exports = router;