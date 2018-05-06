var mysql = require('mysql');

var dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'test'
};

exports.getConnection = function (){
  var connection = mysql.createConnection({dbConfig}
  ,callback);

  return connection;
}

exports.execQuery = function (query,con,callback){
  
  var result;

  con.query (query, function (err, results, fields) {
    if (err) {
      console.log('sql error: ' + err);
    }
    
    result = results;

    return result;
  }); 
}

