let express = require("express");
let cassandra = require('../common/cassandra_module');

/** 
 *  cassandra logic example
 */

let router = express.Router();

async function main() {
    // GET ACCESS
    router.get("/", async function(req, res, next) {
        let query = 'SELECT * FROM test.table1 WHERE content_id = ?'
        param = []

        param.push(1)

        await cassandra.connect();

        let result = await cassandra.get(query, param)

        res.render("cassandra_view", { 
            data: result,
            title: 'cassandra テスト'
        });
    });
}

main();

module.exports = router;