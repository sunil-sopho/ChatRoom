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
var compression = require('compression');
var mainRoutes = require('./backend/routes/MainRoutes');
/* Server config */

//Server's IP address
app.set("ipaddr", "127.0.0.1");

//Server's port number
app.set("port", process.env.PORT || 8080);

app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.resolve(__dirname,'client')));

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

app.use('/',mainRoutes);

//Start the http server at port and IP defined before
app.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
