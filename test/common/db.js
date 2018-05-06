var app = require("express")();
var mysql = require("mysql");
var config = require('config');

var express = require("express");

module.exports = {

    connection: null,

    connect: function() {
        this.connection = mysql.createConnection(config.get('dbConfig'));
        // this.connection.connect();
        return this.connection;
    },

    errorHandler: function(err) {
        if (err) {
            throw new Error(err);
        }
    },

    getAll: function(con,query, params) {
        var self = this;
        return new Promise(function(resolve, reject) {

            // con.connect();

            console.log('query exec')
            con.query(query, params, function(err, result) {
                self.errorHandler(err);
                // callback(result);

                // console.log('resolveResult: ' + result);
                resolve(result);
                return;
            });
        });
    },

    conEnd: function(con) {
        console.log('Connection end')
        con.end();
        return con;
    }
};