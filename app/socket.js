var parseCookie = require('cookie').parse,
    connect = require('connect'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Message = mongoose.model('Message');

module.exports = function (io, sessionStore) {
  io.set('authorization', function (data, accept) {
    if (data.headers.cookie) {
      data.cookie = parseCookie(data.headers.cookie);
      data.sessionID = connect.utils.parseSignedCookie(data.cookie['express.sid'], 'secret');
      data.session = JSON.parse(sessionStore.sessions[data.sessionID]);
      if(data.session.uid){
        User.findOne({_id: data.session.uid}, function(err, user){
          if(user){
            data.user = user;
          }
        });
      }
    } else {
      return accept('No cookie transmitted.', false);
    }
    accept(null, true);
  });

  io.on('connection', function(socket){
    socket.on('server_message', function (data) {
      console.log(socket.handshake.user);
      var message = new Message({
        user_id: socket.handshake.user.id,
        uname: socket.handshake.user.name,
        content: data.message,
        sended_at: new Date()
      });
      message.save(function(err, message){
        io.sockets.emit('client_message', message);
      });
    });
  });
}