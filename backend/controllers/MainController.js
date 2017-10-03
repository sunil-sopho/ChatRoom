/**
 * Created by Sunil on 3/10/17.
 */
var database = require('../Models/db_model');
var _ = require("../../node_modules/underscore");
module.exports = {
    home:home,
    admin:admin,
    message:message
}
function home(req,res){
    res.render('index');
}
function admin(req, res){
    res.render("admin/admin");
}
function message(req, res){
    var message = req.body.message;
    console.log("yo");
    if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return res.json(400, {error: "Message is invalid"});
  }
  var name = req.body.name;

  io.sockets.emit("incomingMessage",{message:message,name:name});

  //Looks good, let the client know
  res.json(200, {message: "Message received"});
}
