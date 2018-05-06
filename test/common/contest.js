var app = require("express")();
var mysql = require("mysql");

var express = require("express");

    var dbConfig = {
        host: '127.0.0.1',
        user: 'root',
        password: 'admin',
        database: 'test',
        dateStrings: true
    };

module.exports = {

    connection: null,

    connect: function() {
        this.connection = mysql.createConnection(dbConfig);
        this.connection.connect();
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

    getOne: function(query, params, callback) {
        var self = this;
        this.query(query, params, function(err, rows) {
            self.errorHandler(err);
            callback(rows.length < 1 ? rows[0] : rows[0]);
        });
    },

    getAll: function(query, params, callback) {
        var self = this;
        this.query(query, params, function(err, rows) {
            self.errorHandler(err);
            callback(rows);
        });
    },

    conEnd: function() {
        console.log('Connection end');
        this.connection.end();
    }
};