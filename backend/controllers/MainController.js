/**
 * Created by Sunil on 3/10/17.
 */
var database = require('../Models/db_model');
var _ = require("../../node_modules/underscore");

var app = require('../../ApplicationInstance');
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
module.exports = {
    home:home,
    admin:admin,
   // message:message
}
function home(req,res){
    res.render('admin/admin');
}
function admin(req, res){
    res.render("admin/admin");
}
/*function message(req, res){
    var message = req.body.message;
    console.log("yo");
    if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return res.json(400, {error: "Message is invalid"});
  }
  var name = req.body.name;

  io.sockets.emit("incomingMessage",{message:message,name:name});
console.log("fds");
  //Looks good, let the client know
  res.status(200).json({message: "Message received"});
}*/
