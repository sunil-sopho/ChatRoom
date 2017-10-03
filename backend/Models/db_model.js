var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'PASSWORD',
database : 'ChatRoom'
});


module.exports = {
    getDataFromTable: function(query,callback)
    {
        connection.query(query, 
            function(err,result,fields){
                if (err) return callback(err, null);
                return callback(null, result);
            }
        );  
    },
}