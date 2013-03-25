module.exports = {
  development: {
    root: require('path').normalize(__dirname + '/..'),
    app: {
      name: 'Nodejs Express Chatroom'
    },
    db: 'mongodb://localhost/chatroom',
  },
  test: {

  },
  production: {
    root: require('path').normalize(__dirname + '/..'),
    app: {
      name: 'Nodejs Express Chatroom'
    },
    db: 'mongodb://localhost/chatroom',
  }
}