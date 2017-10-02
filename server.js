/*
Module dependencies:

  - Express
  - Http (to run Express)
  - Body parser (to parse JSON requests)

  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
*/
var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , bodyParser = require("body-parser");

/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", 8080);

app.set('views',__dirname + '/client/views');
app.engine('html',require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(express.static("public",__dirname + 'client/public'));
//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {

  //Show a simple response message
  response.render("index");

});

//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
