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

    Item.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
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

    Item.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry')
        }
        doc.qr = req.body.qr;
        doc.name = req.body.name;
        doc.description = req.body.description;
        doc.price = req.body.price;
        doc.quantity = req.body.quantity;
        doc.url = req.body.url;
        doc.save();
    })
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'updated successfully.'
        });
    })
});

router.post('/api/delete', isAuthenticated, function(req, res){
    const id = req.body._id;

    Item.findByIdAndRemove(id)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'deleted successfully.'
            });
        })
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

function isAuthenticated(req, res, next) {
    // Get auth header value
    const password = req.headers['authorization'];
    // Check if password is correct
    if(password == "hej123") {
        return next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

module.exports = router;
