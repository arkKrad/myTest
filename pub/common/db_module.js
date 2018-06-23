const mySql = require("mysql2");
const config = require('config');
const {promisify} = require('util');
const express = require("express");

let cnt = 0
let self

module.exports = {

    connection: null,

    // コネクション接続
    connect: async function() {
        try {
            this.connection = await this.handle(this.connection)
            cnt = 0
        } catch (err) {
            console.log('確認用: ', err)
        }
    },

    // 取得処理
    get: async function(query, params) {
        // コネクションチェック
        if (this.connection === null) {
            this.connect();
        }

        console.log('query exec');
        const result = await promisify(this.connection.query).bind(this.connection)(query,params);
        return result;
    },

    // コネクション終了
    conEnd: async function() {
        if (this.connection !== null) {
            this.connection.end();
            this.connection = null
        }
    },

    // コネクション制御
    handle: async function handleConnect(con) {

        self = this

        let dbconfig =
        {
            host: config.get('dbConfig').host,
            user: config.get('dbConfig').user,
            password: config.get('dbConfig').password,
            database: config.get('dbConfig').database,
            dateStrings: config.get('dbConfig').dateStrings
        }
        try {
            con = await mySql.createConnection(dbconfig);

            // console.log('確認: ', dbconfig)

            // console.log('コネクト')

            await con.connect(
                async function(err) {
                    // console.log('コネクトエラー: ', err)
                    if (err) {
                        console.error('error connecting: ');
                        
                        if (cnt <= 3) {
                            console.log('カウント: ', cnt)
                            cnt++
                            // await setTimeout( async function() {
                            //     await self.handle(null)
                            //   }, 0);
                            await self.handle()
                        } else {
                            console.log('エラーをすろう')
                            cnt = 0
                            throw new Error(err)
                        }
                    }
                    // console.log('err is null: ', con.connectionId)
                }
            );
        } catch (err) {
            console.log('ERRRRRRR')
            throw err
        }

        // connection.on('error', function(err) {
        //     console.log('db error', err);
        //     if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        //         console.log('コネクションが失われたので再接続します');
        //         handleConnect(con);                        
        //     } else {                                     
        //         throw err;
        //     }
        // });

        // console.log('止まらない', con)

        // if (con.connectionId === null || typeof con.connectionId === 'undefined') {
        //     await this.conEnd()
        //     await this.connect()
        // }

        return con;
    }

};