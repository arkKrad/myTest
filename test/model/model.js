var mysql = require('../common/contest');

module.exports = {
    getAll: function() {
        return new Promise(function(resolve, reject) {

            var query = 'SELECT * FROM content';

            mysql.getAll(query, [], function(row) {
                resolve(row);
            });
        });
    },
     getOne: function() {
        return new Promise(function(resolve, reject) {

            mysql.connect();

            var query = 'SELECT * FROM content';

            mysql.getAll(query, [], function(row) {
                // mysql.conEnd();
                resolve(row);
            });
        });
    }
    // }
};