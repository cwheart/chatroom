var mongoose = require('mongoose');
var Message = mongoose.model('Message');

exports.index = function(req, res){
  Message.find({}).limit(30).sort({'_id': -1}).exec(function(err, messages){
    res.render('home/index', {messages: messages, title: 'chat'});
  });
};