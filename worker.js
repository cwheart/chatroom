var http = require('http');
var child_req_count=0;
server = http.createServer(function(req, res){
  var i,r;
  for(i=0; i<10000; i++){
    r = Math.random();
  }   
  res.writeHead(200 ,{"content-type" : "text/html"});
  res.end("hello,world");
  child_req_count++;
}); 

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