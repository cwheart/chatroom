var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.new = function(req, res){
  var user = new User({});
  res.render('users/new', {title: 'chat', user: user});
};
  
exports.create = function(req, res){
  var user = new User(req.body.user);
  console.log(user);
  var crypted = require('../../lib/crypted_utils');
  user.crypted_password = crypted.md5(crypted.md5(req.body.user.password));
  user.save(function(err, user){
    req.session.uid = user.id;
    res.redirect('/');
  });
}