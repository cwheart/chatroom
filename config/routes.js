module.exports = function (app) {
  require('../app/filters')(app);

  var home = require('../app/controllers/home');
  app.get("/", home.index);

  var users = require('../app/controllers/users');
  app.get("/join", users.new);
  app.post("/users/create", users.create);

  var user_sessions = require('../app/controllers/user_sessions');
  app.get("/login", user_sessions.new);
  app.post("/user_sessions/create", user_sessions.create);
  app.get("/logout", user_sessions.delete);
}