var net = require('net');
var cp =require('child_process');
function startWorker(handle){
  console.log("start workers :" + 5);
  worker_succ_count = 0;
  var c;
  for(var i=0; i<5; i++){
    c = cp.fork('app');
    c.send({"server" : true}, handle);
  }
}

function startServer(){
  var tcpServer = net.createServer();
  tcpServer.on("error", function(err){
    output("server error ,check the port...");
    about_exit();
  })  
  tcpServer.listen(3000, function(){
    startWorker(tcpServer._handle);
    tcpServer.close();
  }); 
}

startServer();