var crypto = require('crypto');
module.exports = {
  md5: function(str){
    var shasum = crypto.createHash('md5');
    shasum.update(str);
    var result = shasum.digest('hex');
    return result;
  }
}