
/*
 * GET home page.
 */

exports.index = function(req, res){
  req.session.uid = 100;
  if(req.session.uid == null)
    res.render('login', { title: 'Express' });
  else
    res.render('chat', { title: 'Express' });
};