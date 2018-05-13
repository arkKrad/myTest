let express = require("express");
let db = require('../common/db_module');

/** 
 *  サーチ テスト index_sを表示した後にサーチ読んで自画面遷移
 */

let router = express.Router();

var result, id;
var params = []

// 1.一般のコネクション取得
// コネクション取得
async function main() {
    router.get("*", async function(req, res, next) {
        console.log('何故かゲット');
        next();
    });
    router.post("/", async function(req, res, next) {

        let query = 'SELECT * FROM content ';

        await db.connect();

        let cond = await createWhere(req);

        if (cond !== null
            && typeof cond !== "undefined" ) {
                query = query + cond;
        }

        console.log('データ');
        console.log(query);
        console.log(params);

        result = await db.get(query, params);

        // console.log(result);

        res.render("index_s", { 
            data: result,
            title: 'search テスト',
            id: id
        });
    });
}

async function createWhere (req) {
    let where = ''
    id = req.body.id

    if (id !== null
        && typeof id !== "undefined" ) {
            where = 'where content_id = ' + id
            params.push(id);
    }

    return where;
}

main();

module.exports = router;