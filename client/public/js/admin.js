function timeNow() {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      mid='am',
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      h = (h)%24;
      if(h==0){
        h=12;
      } else if(h>12){
        h=h%12;
        mid='pm';
      }
  console.log(d);
  return h + ':' + m + mid;
}
function init() {
  var globalId = "";
 // var app = require('../../../ApplicationInstance');
//  var io = require("../../../node_modules/socket.io").listen(app);

  var serverBaseUrl = document.domain;

  /*
   On client init, try to connect to the socket.IO server.
   Note we don't specify a port since we set up our server
   to run on port 8080
  */
  var socket = io.connect(serverBaseUrl);

  //We'll save our session ID in a variable for later
var sessionId = '';



(function(){
 console.log("onload");
   getCookie("cookieName");
}());

function getCookie(cname) {
    var allcookies = document.cookie;
    var arrayb = allcookies.split(";");
    console.log(arrayb);
    // return null;
    for (item in arrayb) {
        if (arrayb[item].startsWith("cookieName")){
            // var c=item.substr(5);
            var id = arrayb[item].substr(11);
            // $.post('/getroom',{id:id,chatstring:})
            socket.on('connect', function () {
            sessionId = socket.io.engine.id;
            console.log(id+'Connected ' + sessionId);
            var chatstring = $("chatString").text();
            var obj ={
              chatstring:chatstring,
              id:id
            }
            console.log(obj);
            if(chatstring=='')
            {
              socket.emit('newUser',{room:null,id:sessionId,name: $('#name').val()});
            }
            else{
              $.post('http://localhost:4000/getroom',obj)
              .done(function(data){
                console.log(data);
              id = data;
              socket.emit('newUser', {room:id,id: sessionId, name: $('#name').val()});
              });
              id = data + '_' + Math.random().toString(36).substr(2, 9);
              // $(".sideBar").prepend(
              //   '<div class="row sideBar-body">'+
              //     '<div class="col-sm-3 col-xs-3 sideBar-avatar">'+
              //       '<div class="avatar-icon">'+
              //         '<img src="https://bootdey.com/img/Content/avatar/avatar1.png">'+
              //       '</div>'+
              //     '</div>'+
              //     '<div class="col-sm-9 col-xs-9 sideBar-main">'+
              //       '<div class="row">'+
              //         '<div class="col-sm-8 col-xs-8 sideBar-name">'+
              //           '<span class="name-meta">'+'John Doe'+
              //         '</span>'+
              //         '</div>'+
              //         '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">'+
              //           '<span class="time-meta pull-right">18:18'+
              //         '</span>'+
              //         '</div>'+
              //       '</div>'+
              //     '</div>'+
              //   '</div>'
              // );
              // $(".sideBar-body:first").attr('id',id);
            }

          });
        }
    }
}








  //Helper function to update the participants' list
  function updateParticipants(participants) {
   $('#participants').html('');
   for (var i = 0; i < participants.length; i++) {
      $('#participants').append('<span id="' + participants[i].id + '">' +
        participants[i].name + ' ' + (participants[i].id === sessionId ? '(You)' : '') + '<br /></span>');
    }
  }

  /*
 When the client successfully connects to the server, an
 event "connect" is emitted. Let's get the session ID and
 log it.
  */
  //console.log("in admin.js socket");
  // socket.on('connect', function () {
  //   sessionId = socket.io.engine.id;
  //   console.log('Connected ' + sessionId);
  //   socket.emit('newUser', {room:null,id: sessionId, name: $('#name').val()});
  // });

   /*
 When the server emits the "newConnection" event, we'll reset
 the participants section and display the connected clients.
 Note we are assigning the sessionId as the span ID.
  */
  var room;
  socket.on('newConnection', function (data) {
    console.log("room switching initiated");
    room = data.room;
    var id = room + '_' + Math.random().toString(36).substr(2, 9);
    // $(".sideBar").prepend(
    //   '<div class="row sideBar-body">'+
    //     '<div class="col-sm-3 col-xs-3 sideBar-avatar">'+
    //       '<div class="avatar-icon">'+
    //         '<img src="https://bootdey.com/img/Content/avatar/avatar1.png">'+
    //       '</div>'+
    //     '</div>'+
    //     '<div class="col-sm-9 col-xs-9 sideBar-main">'+
    //       '<div class="row">'+
    //         '<div class="col-sm-8 col-xs-8 sideBar-name">'+
    //           '<span class="name-meta">'+'John Doe'+
    //         '</span>'+
    //         '</div>'+
    //         '<div class="col-sm-4 col-xs-4 pull-right sideBar-time">'+
    //           '<span class="time-meta pull-right">18:18'+
    //         '</span>'+
    //         '</div>'+
    //       '</div>'+
    //     '</div>'+
    //   '</div>'
    // );
    // $(".sideBar-body:first").attr('id',id);
    globalId = id;
  });

  /*
 When the server emits the "userDisconnected" event, we'll
 remove the span element from the participants element
  */
  socket.on('userDisconnected', function(data) {
    $('#' + data.id).remove();
  });

  /*
 When the server fires the "nameChanged" event, it means we
 must update the span with the given ID accordingly
  */
  socket.on('nameChanged', function (data) {
    $('#' + data.id).html(data.name + ' ' + (data.id === sessionId ? '(You)' : '') + '<br />');
  });
  /*

  /*
    on click room switch
  */
  // Clear Chatroom
  function clearChat(){
    $(".message-body").remove();
  }






 /*When receiving a new chat message with the "incomingMessage" event,
 we'll prepend it to the messages section
  */
  socket.on('incomingMessage', function (data) {
    console.log("message income");
    var message = data.message;
    var name = data.name;
    console.log("incomingMessage");
    $('#conversation').append(
      '<div class="row message-body">'+
        '<div class="col-sm-12 message-main-receiver">'+
          '<div class="receiver">'+
            '<div class="message-text">'+
              message +
            '</div>'+
            '<span class="message-time pull-right">'+
              timeNow() +
            '</span>'+
        '</div>'+
        '</div>'+
      '</div>'
    );
  });

  /*
 Log an error if unable to connect to server
  */
  socket.on('error', function (reason) {
    console.log('Unable to connect to server', reason);
  });
  /*
 "sendMessage" will do a simple ajax POST call to our server with
 whatever message we have in our textarea
  */
  function sendMessage() {
    var outgoingMessage = $('#outgoingMessage').val();
    var name = $('#name').val();
    socket.emit('message',{message:outgoingMessage,room:room});
    $('#conversation').append(
      '<div class="row message-body">'+
        '<div class="col-sm-12 message-main-sender">'+
          '<div class="sender">'+
            '<div class="message-text">'+
              outgoingMessage +
            '</div>'+
            '<span class="message-time pull-right">'+
              timeNow() +
            '</span>'+
        '</div>'+
        '</div>'+
      '</div>'
    );
    console.log("message sent");
  }

  /*
 If user presses Enter key on textarea, call sendMessage if there
 is something to share
  */
  function outgoingMessageKeyDown(event) {
    if (event.which == 13) {
      event.preventDefault();
      if ($('#outgoingMessage').val().trim().length <= 0) {
        return;
      }
      sendMessage();
      $('#outgoingMessage').val('');
    }
  }

  /*
 Helper function to disable/enable Send button
  */
  function outgoingMessageKeyUp() {
    var outgoingMessageValue = $('#outgoingMessage').val();
    $('#send').attr('disabled', (outgoingMessageValue.trim()).length > 0 ? false : true);
  }

  /*
 When a user updates his/her name, let the server know by
 emitting the "nameChange" event
  */
  function nameFocusOut() {
    var name = $('#name').val();
    socket.emit('nameChange', {id: sessionId, name: name});
  }

  /* Elements setup */
  $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
  $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);
  $('#name').on('focusout', nameFocusOut);
  $('#send').on('click', sendMessage);

  $(".sideBar-body").click(function(){
    $(".sideBar-body").removeClass('selected');
    $(this).addClass('selected');
    $(this).attr('id',globalId);
    var roomValue = $(this).attr('id').substr(0,$(this).attr('id').indexOf('_'));
    socket.emit('roomChange',{room:roomValue});
    clearChat();
  });
}

$(document).ready(init);
