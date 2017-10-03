/**
 * Created by Sunil on 3/10/17.
 */
var database = require('../Models/db_model');

module.exports = {
    home:home,
    admin:admin,
    datatransfer:datatransfer
}
function home(req,res){
    res.render('index');
}
function admin(req, res){
    res.render("admin/admin");
}
function datatransfer(req, res){
    var data = req.body;

    
}
