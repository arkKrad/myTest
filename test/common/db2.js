var mysql = require("mysql");
var config = require('config');

var express = require("express");

module.exports = {

    connection: null,
    poolCluster: null,
    pool: null,

    connect: function() {
        this.connection = mysql.createConnection(config.get('dbConfig'));
        return this.connection;
    },

    connectPool: function() {
        // プールクラスターの設定
        this.poolCluster = mysql.createPoolCluster();
        this.poolCluster.add('MASTER', config.get('dbConfig'));
        this.poolCluster.add('SLAVE1', config.get('dbConfig2'));
        this.poolCluster.add('SLAVE2', config.get('dbConfig3'));

        let co;
    
        this.poolCluster.getConnection('SLAVE*', 'RANDOM', function (connection) {

                console.log(con.config.database);

                // if(err != null){
                //     //失敗
                //     console.log('ERROR');
                //     console.log(err);  	
                //     return;
                // }

                console.log('connected');
                co = connection;

                return connection;

                //接続を解放する。接続はpoolに戻る。
                // con.release();
            });
            console.log('test1');
            return co;
    },

    connectPool2: function() {
        
        this.poolCluster = mysql.createPoolCluster();
        this.poolCluster.add('MASTER', config.get('dbConfig'));
        this.poolCluster.add('SLAVE1', config.get('dbConfig2'));
        this.poolCluster.add('SLAVE2', config.get('dbConfig3'));

        let self = this;

       return new Promise(fn);

        function fn(resolve,reject){
        self.poolCluster.getConnection(function(err,con){
            if(err){
                return reject(err);
            }else{
                return resolve(con);
            }
            });
        };
    },

    poolExec: function (){
        this.pool = mySql.createPool(config.get('dbConfig'));

    // var pool = mySql.createPool({
    //     host : "localhost",
    //     user : "root",
    //     password : "admin",
    //     database : "test", 
    //     connectionLimit : 13,
    // });

        return new Promise(fn);

        function fn(resolve,reject){
        this.pool.getConnection(function(err,con){
            if(err){
                return reject(err);
            }else{
                // con.query("select * from content",function(err,rows){
                //     if(err){
                //         return reject(err);
                //     }else{
                //         con.release(); // releasing connection to pool
                //         console.dir('test4 : ' + rows);
                //         return resolve(rows);
                //     }
                // }); 
                return resolve(con);
            }
            });
        };
    },

    errorHandler: function(err) {
        if (err) {
            throw new Error(err);
        }
    },

    query: function(query, params, callback) {
        console.log('query: ' + query);
        this.connection.query(query, params, callback);
    },

    getAll: function(con, query, params, callback) {
        var self = this;
        // console.log(con.config.database);
        console.log('query exec');
        con.query(query, params, function(err, rows) {
            self.errorHandler(err);
            // return rows;
            console.dir('query result: ' + rows);
            callback(rows);
        });
    },

    conEnd: function(con) {
        console.log('Connection end');
        con.end();
    },
    conRelease: function(con) {
        console.log('Connection release');
        con.release();
    }
};