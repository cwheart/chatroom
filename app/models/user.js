module.exports = function (mongoose) {
  var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    crypted_password: String,
    status: String
  });
  UserSchema.methods.login = function(fn){
    User.findOne({email: this.email, crypted_password: this.crypted_password}, function(err, user){
      fn(user);
    });
  };
  var User = mongoose.model('User', UserSchema);
}