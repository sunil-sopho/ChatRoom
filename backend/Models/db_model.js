    var mysql      = require('mysql');
    // var connection = mysql.createConnection({
    // host     : process.env.RDS_HOSTNAME,
    // user     : process.env.RDS_USERNAME,
    // password : process.env.RDS_PASSWORD,
    // database : 'edc',
    // port     : process.env.RDS_PORT
    // });
var connection = mysql.createConnection({
host     : 'sql12.freesqldatabase.com',//'localhost',//process.env.RDS_HOSTNAME,
user     : 'sql12224028',//'root',//process.env.RDS_USERNAME,
password : 'jaKPLGcNWy',//'PASSWORD',// process.env.RDS_PASSWORD,
database : 'sql12224028'//'chatRoom',
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
