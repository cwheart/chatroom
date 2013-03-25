module.exports = function (mongoose) {
  var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    crypted_password: String
  });

  UserSchema.methods.login = function(){
    mongoose.model('User').find({email: this.email}, function(user){
      return user;
    });
  };
  
  mongoose.model('User', UserSchema);
}