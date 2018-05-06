var mysql = require('../common/db2');

module.exports = {
    getAll: function() {
            mysql.getAll(query, [], function(err, result) {
                if (err){
                    throw err;
                }
                return result;
            });
        });
    }
    // }
};