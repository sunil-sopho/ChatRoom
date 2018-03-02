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
var morgan  = require('morgan');
var app = require('./ApplicationInstance');
var passport = require('passport');
// var mongoose = require('mongoose'); MOngo Connection failure aws
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var configDB = require('./backend/Models/database.js');
var http = require("http").createServer(app);
var compression = require('compression');
var connection = require('./backend/Models/db_model.js')
// var connection2 = require('./backend/Models/db_Model2.js')
//var mainRoutes = require(__dirname+'/backend/routes/MainRoutes');
var _ = require("underscore");
var io = require("socket.io").listen(http);
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var User = require('./backend/Models/user1.js')
//configuration ===============================================





// configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database MOngo Connection failure aws

// require('./backend/Models/passport')(passport); // pass passport for configuration



//================ Server config ================================

//Server's IP address
// app.set("ipaddr", process.env.IP || "127.0.0.1" );

//Server's port number
app.set("port", process.env.PORT || 4000);


//
// var ChatSchema = mongoose.Schema({
//   created: Date,
//   content: String,
//   username: String,
//   room: String
// }); MOngo Connection failure aws


// var Chat = mongoose.model('Chat',ChatSchema); MOngo Connection failure aws

app.all('*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


/*
  The list of participants in our chatroom.
  The format of each participant will be:
  {
    id: "sessionId",
    name: "participantName"
  }
*/
var participants = [];
var usernum =0;
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


//app.use(bodyParser()); // get information from html forms

app.use(compression());
app.use(express.static(path.resolve(__dirname,'client/public')));




app.set('views',__dirname + '/client/views');
app.engine('html',require('ejs').renderFile);
app.set("view engine", "ejs");
//app.use(express.static("public",__dirname + '/client/public'));
//Tells server to support JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// required for passport
app.use(session({ secret: 'letthegamebegins' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var rooms=0;

function newRoom(room,chatstring){
  var query = 'SELECT `email` from `links` where `link` = ?'
  connection.query(query,chatstring,function(err,results,fields){
    if(results===undefined)
    {
      return null;
    }
    else if(Object.keys(results).length===0){
      return null;
    }
    else{
      return createTable2(results[0],room);
    }
  });
}

function createTable2(room){
  var query = 'Create TABLE IF NOT EXISTS `'+email+'` ( `room` INT(32) NOT NULL) ENGINE = InnoDB;'
  connection2.query(query,function(err,results,fields){
    connection2.query('SELECT `room` from '+email+' where `room` = ?',room,function(err,results,fields){
      if(Object.keys(results).length==0){
        connection2.query('INSERT INTO `'+email+'` `room` values '+room,function(err,results,fields){
          console.log("done");
        })
      }
    })
  });
}


function createTable(chatstring,id,res){
  var query = 'CREATE TABLE IF NOT EXISTS `'+chatstring+'` ( `id` INT(32) NOT NULL , `roomnum` INT(32) NOT NULL) ENGINE = InnoDB;'
    connection.query(query,function(err,results,fields){
      getid(chatstring,id,res);
    })
}

function getid(chatstring,id,res){
  var query = 'SELECT `roomnum` from '+chatstring+' where `id`= ?';
  connection.query(query,id,function(err,results,fields){
    console.log(results);
    if(results===undefined)
    {
      console.log("in if"+rooms)
        connection.query('INSERT INTO `'+chatstring+'` (`id` ,`roomnum`) values ('+id+' ,'+rooms+')',function(err,results,fields){
        console.log("in if connection"+rooms);
        rooms++;
        newRoom(rooms-1,chatstring);
        res.json(rooms-1);
      });
    }
    else if(Object.keys(results).length==0){
      console.log("in else if"+rooms)
        connection.query('INSERT INTO `'+chatstring+'` (`id` ,`roomnum`) values ('+id+' ,'+rooms+')',function(err,results,fields){
          console.log("in else if connection"+rooms);
        rooms++;
        newRoom(rooms-1,chatstring);
        res.json(rooms-1);
    });
    }
  else
  {
    console.log("results here"+id);
    res.json(results[0].roomnum);
  }
  })
}

function getRoomNo(chatstring){
  // extract room no from String
  return chatstring;
}
/* Server routing */


//app.use('/',mainRoutes);

//=================================================================

// ==========         Routes       =================================

//==============================================================


//Handle route "GET /", as in "http://localhost:8080/"
/*app.get("/", function(request, response) {

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

});*/

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/auth',function(req,res){
        res.render('auth.ejs')
    })

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/admin',function(req,res,next){
      if(sessionChecker1(req,res,next)){
        res.render('admin/admin.ejs');
      }
    })

    app.post('/listing',function(req,res){
console.log(req.session.user.email);
      connection2.query('CREATE TABLE IF NOT EXISTS `'+req.session.user.email+'` ( `room` INT(32) NOT NULL) ENGINE = InnoDB;',function(err,results,fields){
        connection2.query('SELECT * from `'+req.session.user.email+'`',function(err,results,fields){
          if(err) throw err;
          results = parseIt(results);
        //console.log(result);
          return res.json(results);
        })
    })
    });
function parseIt(rawData){
    rawData = JSON.stringify(rawData);
    rawData = JSON.parse(rawData);
    return rawData;
}

app.use(session({
key:'user_sid',
secret: 'letthegamebegins',
resave:false,
saveUninitialized:false,
cookie:{
    expires:600000
}

}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
var sessionChecker1 = (req,res,next) => {
  console.log(req.cookies);
  console.log(req.session);
  if(req.session.user) {
    return true;
  }
  else
  {
    res.redirect('/');
  }

};

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log(req.session.user);
        res.redirect('/admin');
    } else {
        next();
    }
};

app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    usernum++;
    res.cookie('cookieName',usernum, { maxAge: 900000, httpOnly: false });
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});

    // LOGOUT ==============================
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/auth');
    }
});

    // return a random string to be used
    var count = 0;
    app.post("/getrandomid", function(req,res){
        var value = bcrypt.hashSync(count,salt);
        count++;
        res.send(value);
    });

    //
    var chatrouter = require('express').Router();
    app.use('/randomChats/',chatrouter);
    chatrouter.route('/:chatstring').get(function(req,res){
       roomNo = getRoomNo(req.params.chatstring);
       res.render('anonymous/anonymous.ejs',{chatstring:req.params.chatstring});
      // res.send(req.params.chatstring);
    });

    app.post("/getroom", function(req, res) {
      // console.log(req);
      createTable(req.body.chatstring,req.body.id,res)
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));

        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.route('/login')
        .get(sessionChecker,(req, res) =>{
            res.render('login.ejs', { message: '' });
        })
        .post((req,res) =>{
          var email = req.body.email,
              password = req.body.password;

        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                res.render('login.ejs',{
                    user: null,
                    message: 'User does not exit'
                });
            } else if (!user.validPassword(password)) {
                res.render('login.ejs',{
                    user: null,
                    message: 'Oops! wrong password'
                });
            }
             else {
                req.session.user = user.dataValues;
                res.redirect('/admin');
            }
        });

        })

    app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render('signup.ejs',{
            user:req.session.user,
            message: ''
        });
    })
    .post((req, res) => {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {

            req.session.user = user.dataValues;
            // checkEmail(req.session.user.email);
            res.redirect('/admin');
        })
        .catch(error => {
            console.log(error);
            res.render('login.ejs',{
                user: null,
                message: 'Email id is already in use'
            });
        });
    });

        // process the login form
        // app.post('/login', passport.authenticate('local-login', {
        //     successRedirect : '/admin', // redirect to the secure profile section
        //     failureRedirect : '/login', // redirect back to the signup page if there is an error
        //     failureFlash : true // allow flash messages
        // }));

        // SIGNUP =================================
        // show the signup form
        // app.get('/signup', function(req, res) {
        //     res.render('signup.ejs', { message: req.flash('signupMessage') });
        // });

        // // process the signup form
        // app.post('/signup', passport.authenticate('local-signup', {
        //     successRedirect : '/admin', // redirect to the secure profile section
        //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
        //     failureFlash : true // allow flash messages
        // }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/admin',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/admin',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/admin',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/admin', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/admin',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/admin',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/admin',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.email    = undefined;
        user.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });




// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}










//=======================================================================================

// socket io checking connection here

//========================================================================================
// var rooms = ['1','2','3','4','5'];

io.on("connection", function(socket){

  var defaultroom = 'general';

  /* socket.broadcast.to('game').emit('message', 'nice game');
    When a new user connects to our server, we expect an event called "newUser"
    and then we'll emit an event called "newConnection" with a list of all
    participants to all connected clients
  */
  // socket.emit('setup',{
  //   rooms: rooms
  // });
  socket.on('message',function(data){
    console.log(data);
    // var newMsg = new Chat({
    //   username: data.username,
    //   content: data.message,
    //   room: data.room,
    //   created: new Date()
    // });
    // console.log(newMsg);
    // newMsg.save();
    console.log("here in socket message"+" "+data.room+" "+data.message);
    io.sockets.in(data.room).emit("incomingMessage",{message:data.message});
  // socket.broadcast.to(data.room).emit("incomingMessage",{message:data.message});
  });

  socket.on("newUser", function(data) {
    data.room = data.room;
    socket.join(data.room);
    console.log(data);
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants,room:data.room});
  });


  // io.in(defaultroom).emit('newConnection',{participants: participants});
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

  //Listens to new chat
  // socket.on('new message', function(data) {
  //// Create message
  //   var newMsg = new Chat({
  //     username: data.username,
  //     content: data.message,
  //     room: data.room.toLowerCase(),
  //     created: new Date()
  //   });
  //   //Save it to database
  //   newMsg.save(function(err, msg){
  //     //Send message to those connected in the room
  //     io.in(msg.room).emit('message created', msg);
  //   });
  // });
  socket.on('roomChange',function(data){
    socket.join(data.room);
    console.log(data.room);
    io.in(data.room).emit("newConnection",{participants:participants,room:data.room});
  });

});




//Start the http server at port and IP defined before
http.listen(app.get("port"), function() {
  console.log("Server up and running. Go to http://" + "heyU" + ":" + app.get("port"));
});
