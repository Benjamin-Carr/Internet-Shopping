/****************************************************
 *      create mongoose database  
 ****************************************************/
var mongoose = require('mongoose');

/****************************************************
 *      create schema 
 ****************************************************/
var CommentSchema = new mongoose.Schema({
  title: String,
  price: Number, 
  url: String,
  upvotes: { type: Number, default: 0 },
});


/****************************************************
 *      create schema function: upvote                                      
 *      increment votes of specific comment by 1    
 ****************************************************/
CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

/****************************************************
 *      add schema to database model  
 ****************************************************/
mongoose.model('Comment', CommentSchema);
