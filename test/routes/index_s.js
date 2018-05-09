let express = require("express");
// var mysql = require("../common/db2");
let db = require('../common/db_m');

/** DBモジュールに対しての取得処理を呼び出して結果の表示
 *  
 *  app → router →  model → db → router → html(結果)
 */

let router = express.Router();

let query = 'SELECT * FROM content';
let result;

// 1.一般のコネクション取得
// コネクション取得
async function main() {
    await db.connect();

    result = await db.get(query, []);

    console.log(result);

    router.get("/", function(req, res, next) {
    // console.dir('result: ' + result);

        res.render("index3", { 
            data: result,
            title: 'indexS テスト'
        });
    });
}

main();

module.exports = router;