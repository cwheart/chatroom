module.exports = function (mongoose) {
  var EmailCheckSchema = mongoose.Schema({
    user_id: String,
    email: String,
    created_at: String
  });
  
  mongoose.model('EmailCheck', EmailCheckSchema);
}