module.exports = function (mongoose) {
  var MessageSchema = mongoose.Schema({
    user_id: String,
    uname: String,
    content: String,
    sended_at: String
  });
  
  mongoose.model('Message', MessageSchema);
}