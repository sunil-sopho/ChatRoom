/**
 * Created by sunil on 3/10/17.
 */
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');

/*
router.route('/').get(mainController.home);
router.route('/admin').get(mainController.admin);
router.route('/message').post(mainController.message);
*/
/*
app.get("/", function(request, response) {

  //Render the view called "index"
  response.render("index");

});
app.get("/admin",function(req,res) {
  res.render("admin/admin")
});
//POST method to create a chat message
app.post("/message", function(request, response) {

  //The request body expects a param named "message"
  var message = request.body.message;

  //If the message is empty or wasn't sent it's a bad request
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  //We also expect the sender's name with the message
  var name = request.body.name;

  //Let our chatroom know there was a new message
  io.sockets.emit("incomingMessage", {message: message, name: name});

  //Looks good, let the client know
  response.json(200, {message: "Message received"});

});
*/
module.exports = router;