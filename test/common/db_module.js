const mySql = require("mysql");
const config = require('config');
const {promisify} = require('util');
const express = require("express");

module.exports = {

    connection: null,
    poolCluster: null,
    pool: null,

    // コネクション接続
    connect: async function() {
        this.connection = await mySql.createConnection(config.get('dbConfig'));

        await this.connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                this.errorHandler(err);
            }
        });
        console.log('connected as id ' + this.connection);
    },

    // connectPool: function() {
    //     var self = this;
    //     this.pool = mySql.createPool(config.get('dbConfig'));
    //     this.pool.getConnection(function(err,con){
    //         this.connection = con;
    //         if(err){
    //             console.log('connect err');
    //             return self.errorHandler(err);
    //         }else{
    //             console.log('connected');
    //             return this.connection;
    //         }
    //     });
    // },

    // コネクションプールの接続
    connectPool: function (){
        let self = this;
        self.pool = mySql.createPool(config.get('dbConfig'));

        return new Promise(co);

        function co(resolve,reject){
            self.pool.getConnection(function(err,con){
                self.connection = con;
                if(err){
                    return reject(err);
                }else{
                    console.log('connected pool');
                    return resolve(con);
                }
            });
        };
    },

    // コネクションプールクラスター接続
    connectPoolCluster: function() {
        let self = this;

        // プールクラスターの設定
        this.poolCluster = mySql.createPoolCluster();
        this.poolCluster.add('MASTER', config.get('dbConfig'));
        this.poolCluster.add('SLAVE1', config.get('dbConfig2'));
        this.poolCluster.add('SLAVE2', config.get('dbConfig3'));

        return new Promise(fn);

        function fn(resolve,reject){
            self.poolCluster.getConnection(function(err,con){
                self.connection = con;
                if(err){
                    console.log('connect err');
                    return reject(err);
                }else{
                    console.log('connected pc');
                    return resolve(con);
                }
            });
        };
    },

    // エラーハンドラ
    errorHandler: function(err) {
        if (err) {
            console.log('sql error');
            throw new Error(err);
        }
    },

    // 取得処理
    get: async function(query, params) {
        let self = this;

        console.log('query exec');
        // self.connection.query(query, params, function(err, rows) {
        //     self.errorHandler(err);
        //     console.log('query result: ' + rows);
        //     return rows;
        // });
        const result = await promisify(this.connection.query).bind(this.connection)(query,params);
        return result;
    },

    // コネクション終了
    conEnd: function() {
        console.log('Connection end');
        this.connection.end();
    },

    // コネクション解放
    conRelease: function() {
        this.connection.release();
        console.dir('Connection release: ' + this.connection);
        // con.end();
    }

};