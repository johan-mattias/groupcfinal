//server/routes/routes.js
//code inspired by https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Item = require('../../models/Item');

router.get('/', function(req, res){
    res.render('index')
});

router.route('/insert')
    .post(function(req,res) {
        var item = new Item();
        item.description = req.body.description;
        item.price = req.body.price;

        item.save(function(err) {
            if (err)
                res.send(err);
            res.send('Item successfully added!');
        });
        res.redirect('/');
    })

router.route('/update')
    .post(function(req, res) {
        Item.findOne(({description: req.description}, function (err, doc){
            if (err){
                console.error('Error, no entry found!')
        }
            console.log(doc)
            doc.description = req.description;
            doc.price = req.price;
            doc.save();
        });
        res.redirect('/');
    });

router.get('/delete', function(req, res){
    var id = req.query.id;
    Item.findByIdAndRemove(id).exec(function(err, item){
        if (err)
            res.send(err)
        res.send('Item successfully deleted!');
    })
    res.redirect('/');
});


module.exports = router;