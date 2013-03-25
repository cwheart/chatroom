var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypted = require('../../lib/crypted_utils');

exports.new = function(req, res){
  var user_session = {};
  res.render('user_sessions/new', {title: 'chat', user: user_session});
};
  
exports.create = function(req, res){
  var user = new User(req.body.user_session);
  user.crypted_password = crypted.md5(crypted.md5(req.body.user_session.password));
  User.findOne({email: user.email, crypted_password: user.crypted_password}, function(err, user){
    req.session.uid = user.id;
    res.redirect('/');
  });
}

exports.delete = function(req, res){
  req.session.uid = null;
  res.redirect('/login');
}