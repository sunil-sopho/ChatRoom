    var mysql      = require('mysql');
    // var connection = mysql.createConnection({
    // host     : process.env.RDS_HOSTNAME,
    // user     : process.env.RDS_USERNAME,
    // password : process.env.RDS_PASSWORD,
    // database : 'edc',
    // port     : process.env.RDS_PORT
    // });
var connection = mysql.createConnection({
host     : 'localhost',//process.env.RDS_HOSTNAME,
user     : 'root',//process.env.RDS_USERNAME,
password : 'PASSWORD',// process.env.RDS_PASSWORD,
database : 'chatRoom2',
// port     : process.env.RDS_PORT
});

    
    connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
    });
    module.exports = connection;