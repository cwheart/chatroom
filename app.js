
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    app = express(),
    //MemoryStore = express.session.MemoryStore,
    RedisStore = require('connect-redis')(express),
    path = require('path'),
    sessionStore = new RedisStore({
      host: '127.0.0.1',
      db: 'chat_room'
    });

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')
  , models = require('./app/models/base')(mongoose);
// Bootstrap db connection
mongoose.connect(config.db);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.set('layout', 'layouts/app') ;// defaults to 'layout' 
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({store: sessionStore
        , secret: 'secret'
        , key: 'express.sid'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./config/routes')(app);

var server = http.createServer(app);

var io = require('socket.io').listen(server);

require('./app/socket')(io, sessionStore);

// server.listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
// });

process.on("message", function(m ,handle){
  if(handle){
    server.listen(handle, function(err){
      if(err){
        console.log("worker listen error");
      }else{
        process.send({"listenOK" : true});
        console.log("worker listen ok");
      }   
    });
  }
});