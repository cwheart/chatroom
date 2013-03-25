var mongoose = require('mongoose');
var User = mongoose.model('User');

var currentUser = function(req, res, next){
  if(!req.currentUser && req.session.uid){
    User.findOne({_id: req.session.uid}, function(err, user){
      if(user){
        req.currentUser = user;
      }else{
        req.session.uid = null;
      }
      next();
    });
  }else{
    next();
  }
};

var accessDenied = function(req, res, next){
  if(!req.currentUser){
    res.redirect('/login');
  }else{
    next();
  }
};

module.exports = function (app) {
  app.all('*', currentUser);
  app.all('/', accessDenied);
}