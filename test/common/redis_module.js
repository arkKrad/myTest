var app = require("express")();
var redis = require('redis');
var config = require('config');

var express = require("express");

const {promisify} = require('util');

module.exports = {

    client: null,

    // 接続
    connect: async function() {
        
        try {
            let conf = config.get('redisConfig');
        } catch(err) {
            console.log('conf err: ' + err);
        }

        this.client = redis.createClient(config.get('redisConfig'));
    },

    // 取得処理
    get: async function(key) {
        let self = this;

        console.log('redis get');
        try {
            const getAsync = promisify(this.client.get).bind(this.client);
            const result = await await getAsync(key);
            console.log('redis result');
            console.log(result);
            return result;
        } catch(err) {
            console.log('error is: ' + err);
        }
    },

    // 文字列設定処理
    set: function(key, value) {
        this.client.set(key,value, function(err) {
            if (err) {
                console.log('error is: ' + err);
            }
        });
    },

    // ハッシュ構造設定処理
    // redisキー, 連想配列キー、連想配列値での登録
    setObj: function(storeKey,key, value) {
        console.log('storekey: ' + storeKey)
        console.log('key: ' + key)
        console.log('value: ' + value)
        this.client.hset(storeKey,key,value, function(err) {
            if (err) {
                console.log('error is: ' + err);
            }
        });
    },

        // ハッシュ構造設定処理
        // 連想配列まるごとの登録
    setObj2: function(storeKey, value) {
        console.log('storekey: ' + storeKey)
        // console.log('key: ' + key)
        console.log('value: ' + value)
        this.client.hmset(storeKey,value, function(err) {
            if (err) {
                console.log('error is: ' + err);
            }
        });
    },

    // ハッシュ構造取得処理
    // redisキーで連想配列まるごと取得
    getObj: async function(storeKey) {

        console.log('redis Objget');
        try {
            const getObjAsync = promisify(this.client.hgetall).bind(this.client);
            console.log('storekey: ' + storeKey)
            const result = await getObjAsync(storeKey);
            console.log('Objget result');
            console.log(result);
            return result;
        } catch(err) {
            console.log('error is: ' + err);
        }
    },

        // ハッシュ構造取得処理
        // redisキーと連想配列キーで値を取得
    getObj2: async function(storeKey, key) {

        console.log('redis Objget');
        try {
            const getObjAsync = promisify(this.client.hget).bind(this.client);
            console.log('storekey: ' + storeKey)
            console.log('key: ' + key)
            const result = await getObjAsync(storeKey, key);
            console.log('Objget result');
            console.log(result);
            return result;
        } catch(err) {
            console.log('error is: ' + err);
        }
    }
};