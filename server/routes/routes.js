//server/routes/routes.js
//code inspired by:
//https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
//https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3

//====LIST DEPENDENCIES===//
const express = require('express');
const Item = require('../../models/Item');
const router = express.Router();
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

router.post('/delete-by-id', function(req, res){
    Item.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            console.log('Item removed');
        }
        else {
            console.log('Error removing');
        }
    });
});

module.exports = router;
