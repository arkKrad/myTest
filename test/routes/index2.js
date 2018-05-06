var express = require('express');
var router = express.Router();
var sqlclient = require('../model/mysqlConnection');

// Mysqlの接続
var con = sqlclient.getConnection();
  // 接続
  con.connect();
  // SQL
  var query = 'SELECT * FROM content';
  var result = sqlclient.execQuery(query, con, null)
    console.log(result);
    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { data: result });
      next();
    });

module.exports = router;
