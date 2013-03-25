var socket = io.connect('http://localhost:3000');
socket.on('client_message', function (data) {
  $("#chat_list").prepend("<li><span>"+data.uname+"：</span><p>"+data.content+"</p></li>");
});

// send message
$("#send").click(function(){
  var message = $("#message_box").val();
  if(message == ''){
    $("#message_box").css('background', 'yellow');
    $("#message_box").animate({'background-color': '#000000'}, 500);
    return false;
  }
  socket.emit('server_message', { message: message });
  return false;
});
