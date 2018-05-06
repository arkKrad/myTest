var mySql = require("mysql");
var Promise = require("promise");

module.exports = {

    poolExec: function (query){

    var pool = mySql.createPool({
    host : "localhost",
    user : "root",
    password : "admin",
    database : "test", 
    connectionLimit : 13,
    });

    return new Promise(fn);

    function fn(resolve,reject){
        pool.getConnection(function(err,con){
            if(err){
                return reject(err);
            }else{
            //   con.query(query,function(err,rows){
            //       if(err){
            //           return reject(err);
            //       }else{
            //           con.release(); // releasing connection to pool
            //           return resolve(rows);
            //       }
            //   }); 
            return resolve(con);
            }
        }); // getConnection
        }// fn
    }, // getDepartments

    conRelease: function(con) {
        con.release();
        console.dir('Connection release' + con);
        // con.end();
    }

};