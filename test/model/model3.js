const mysql = require('../common/db4');

module.exports = {

    connect: function() {
        let con = mysql.connect();
        con.connect();
        return con;
    },

    // 旨く動かなかった → DB側でプロミスの設定
    // connectPool: function() {
    //     return new Promise(function(resolve, reject) {
    //         mysql.connectPool(function(val) {
    //             resolve(val);
    //         });
    //     });
    // },
    
    connectPool: function() {
        return mysql.connectPool();
    },

    connectPoolCluster: function() {
        return mysql.connectPoolCluster();
    },

    get: function(con,query,param) {
        return new Promise(function(resolve, reject) {

            mysql.get(con,query, [], function(row) {
                console.dir(row);
                resolve(row);
            });
        });
    },
     getOne: function() {
        return new Promise(function(resolve, reject) {

            mysql.connect();

            mysql.getAll(query, [], function(row) {
                // mysql.conEnd();
                resolve(row);
            });
        });
    },

    getAll: function(con, query, params, callback) {
        var self = this;
            mysql.get(con,query, [], function(row) {
                console.dir(row);
                callback(row);
            });
    },


    conEnd: function(con) {
        console.log('Connection end');
        mysql.conEnd(con);
    },

    conRelease: function(con) {
        console.log('Connection release' + con);
        mysql.conRelease(con);
    }
};