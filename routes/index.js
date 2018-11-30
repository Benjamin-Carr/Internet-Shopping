/******************************************
 *       variables and requires 
 ******************************************/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/******************************************
 *       GET home page (index.html) 
 ******************************************/
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/******************************************
 *       GET shopping page
 ******************************************/
router.get('/shopping', function(req, res) {
  res.sendFile('shopping.html', { root: 'public' });
});

/******************************************
 *       GET /products
 *       return a list of products 
 ******************************************/
router.get('/products', function(req, res, next) {
    Comment.find(function(err, products) {
        if (err) { return next(err); }
        res.json(products);
    });
});

/******************************************
 *       POST /products
 *       create a new product 
 ******************************************/
router.post('/products', function(req, res, next) {
    var product = new Comment(req.body);
    product.save(function(err, product) {
        if (err) { return next(err); }
        res.json(product);
    });
});

/******************************************
 *       GET /products/:product
 *       return a product 
 ******************************************/
router.get('/products/:product', function(req, res) {
    res.json(req.product);
});

module.exports = router;

/******************************************
 *       PUT /products/:product/upvote
 *       upvote a product
 ******************************************/
router.put('/products/:product/upvote', function(req, res, next) {
    req.product.upvote(function(err, product) {
        if (err) { return next(err); }
        res.json(product);
    });
});

/******************************************
 *       DELETE /products/:product/
 *       delete a product
 ******************************************/
router.delete('/products/:product', function(req, res) {
  console.log("in Delete");
  req.product.remove();
  res.sendStatus(200);
});

/******************************************
 *       param
 *       preload a product object by _id
 ******************************************/
router.param('product', function(req, res, next, id) {
    Comment.findById(id, function(err, product) {
        if (err) { return next(err); }
        if (!product) { return next(new Error("can't find product")); }
        req.product = product;
        return next();
    });
});