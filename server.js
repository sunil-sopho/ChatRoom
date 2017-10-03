/*
Module dependencies:

  - Express
  - Http (to run Express)
  - Body parser (to parse JSON requests)

  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
*/
var express = require("express")
  , bodyParser = require("body-parser");
var path = require('path');
var logger = require('morgan');
var app = require('./ApplicationInstance');
var http = require("http").createServer(app);
var compression = require('compression');
var mainRoutes = require('./backend/routes/MainRoutes');
var _ = require("underscore");
var io = require("socket.io").listen(http);
/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", process.env.PORT || 8080);

/*
  The list of participants in our chatroom.
  The format of each participant will be:
  {
    id: "sessionId",
    name: "participantName"
  }
*/
var participants = [];

app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.resolve(__dirname,'client/public')));

app.set('views',__dirname + '/client/views');
app.engine('html',require('ejs').renderFile);
app.set("view engine", "ejs");
//app.use(express.static("public",__dirname + 'client/public'));
//Tells server to support JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
/*app.get("/", function(request, response) {

  //Show a simple response message
  response.render("index");

});*/

io.on("connection", function(socket){

  /*
    When a new user connects to our server, we expect an event called "newUser"
    and then we'll emit an event called "newConnection" with a list of all
    participants to all connected clients
  */
  socket.on("newUser", function(data) {
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants});
  });

  /*
    When a user changes his name, we are expecting an event called "nameChange"
    and then we'll emit an event called "nameChanged" to all participants with
    the id and new name of the user who emitted the original message
  */
  socket.on("nameChange", function(data) {
    _.findWhere(participants, {id: socket.id}).name = data.name;
    io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  });

  /*
    When a client disconnects from the server, the event "disconnect" is automatically
    captured by the server. It will then emit an event called "userDisconnected" to
    all participants with the id of the client that disconnected
  */
  socket.on("disconnect", function() {
    participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
  });

});



app.use('/',mainRoutes);

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
