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
 *       GET /comments
 *       return a list of comments 
 ******************************************/
router.get('/comments', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) { return next(err); }
        res.json(comments);
    });
});

/******************************************
 *       POST /comments
 *       create a new comment 
 ******************************************/
router.post('/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

/******************************************
 *       GET /comments/:comment
 *       return a comment 
 ******************************************/
router.get('/comments/:comment', function(req, res) {
    res.json(req.comment);
});

module.exports = router;

/******************************************
 *       PUT /comments/:comment/upvote
 *       upvote a comment
 ******************************************/
router.put('/comments/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

/******************************************
 *       DELETE /comments/:comment/
 *       delete a comment
 ******************************************/
router.delete('/comments/:comment', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});

/******************************************
 *       param
 *       preload a comment object by _id
 ******************************************/
router.param('comment', function(req, res, next, id) {
    Comment.findById(id, function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(new Error("can't find comment")); }
        req.comment = comment;
        return next();
    });
});