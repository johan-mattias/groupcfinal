//server/routes/routes.js
//code inspired by:
//https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
//https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3

//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const Item = require('../../models/Item');
const router = express.Router();
const mongoose = require('mongoose');

//const url = 'mongodb://heroku_6dn4h73b:co8pe58sjmurt19g8t7ddd7vef@ds111618.mlab.com:11618/heroku_6dn4h73b';
const url = 'mongodb://armanv:OVtDy6R9ZgnYI3qZ5IUZB@ds117158.mlab.com:17158/scrubit';
//=========================//


router.get('/api', function(req, res){
     res.send("hejsannnn");
});

router.get('/api/get-all', function(req, res) {
/*    Item.find({}).then(eachOne => {
        res.json(eachOne);
    })*/


    Item.find()
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Description and Price will be inputs used by app
router.post('/api/insert', function(req, res) {
/*    Item.create({
        id: req.body.id,
        qr: req.body.qr,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        url: req.body.url
    }).then(item => {
        res.json(item)
    });*/
    console.log("################");
    console.log(req.body.qr);
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.price);
    console.log(req.body.quantity);
    console.log(req.body.url);

    console.log("################");

    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        qr: req.body.qr,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        url: req.body.url
    });
    item.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.post('/api/update', function (req, res) {
    const id = req.body._id
    Item.findById(id, function(err, res) {
        if (err) {
            console.error('error, no entry')
        }
        res.qr = req.body.qr;
        res.name = req.body.name;
        res.description = req.body.description;
        res.price = req.body.price;
        res.quantity = req.body.quantity;
        res.url = req.body.url;
    })
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'update successfully.'
        });
    })
});

router.post('/api/delete', function(req, res){
    const id = req.body._id;
    console.log("ffffffff")
    console.log(req.body._id)
    console.log("ffffffff")
    Item.findByIdAndRemove(id)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'deleted successfully.'
            });
        })
/*

    Item.findByIdAndRemove(id, function(err, doc) { // doc here is actually err
        // handle err1
        console.log('findByIdAndRemove doc: ', doc1);
        Example.find({}, function(err2, docs) {
            console.log('Finding all: ', docs)
        })
    })*/


    /*Item.find({
        description: req.body.Name
    }, function(err, docs){
        docs.remove();
    });*/
});

router.post('/api/delete-by-id', function(req, res){
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
