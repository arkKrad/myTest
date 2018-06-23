var config = require('config');
const cassandra = require('cassandra-driver');
var express = require("express");

const {promisify} = require('util');

module.exports = {

    client: null,
    authProvider: null,

    // 接続
    connect: async function() {
        
        try {
            var conf = {
                'contactPoints': config.get('cassandraConfig').contactPoints,
                'keyspace': config.get('cassandraConfig').keyspace
            }
            // 認証情報 今は使わない
            // this.authProvider = new cassandra.auth.PlainTextAuthProvider(
            //     config.get('cassandraConfig').authUser,
            //     config.get('cassandraConfig').authPass
            // );
            // conf.authProvider = this.authProvider
            var Provider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra')
            console.log('conf: ', conf)
        } catch(err) {
            console.log('conf err: ' + err);
        }

        // this.client = new cassandra.Client(conf);
        this.client = new cassandra.Client({ contactPoints:['127.0.0.1:9042'], 
                        authProvider: Provider});
        // console.log('client: ', this.client)
    },

        // 取得処理
    get: async function(query, param) {
        let self = this;

        console.log('cassandra get');
        try {
             const result = await promisify(this.client.execute).bind(this.client)(query,param,{ prepare : true });
            // const getAsync = promisify(this.client.execute).bind(this.client)(query,param);
            // const result = await getAsync(query, param);
            console.log('cassandra result');
            console.log(result);
            return result;
        } catch(err) {
            console.log('error is: ' + err);
        }
    }
};