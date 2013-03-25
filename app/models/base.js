module.exports = function (mongoose) {
  require('./user')(mongoose);
  require('./message')(mongoose);
}