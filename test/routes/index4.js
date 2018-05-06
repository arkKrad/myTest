let express = require("express");
let test = require("../common/db.js");

/** DBモジュールに対しての取得処理を呼び出して結果の表示
 *  app → router → DB → router → 結果（HTML）
 *  基本的な形？
 */

// module.exports = function() {
    let router = express.Router();
    let query = 'SELECT * FROM content';
    let query2 = 'SELECT * FROM test_data';
    
    // 接続～コネクション終了までの流れ
    let con = test.connect();
    let rows, row2;
    test.getAll(con,query,[])
     .then((result) => {
        rows = result;
        console.log('test: ' + rows);
      });
    con = test.conEnd(con);
    // console.log('result: ' + rows[0]);
    // console.log('result2: ' + rows2[0]);

    // 別コネクションで接続して検索～コネクション終了までの流れ
    let con2 = test.connect();

    test.getAll(con2,query2,[])
     .then((result) => {
        row2 = result;
        console.log('test2: ' + row2);
      });
    test.conEnd(con2);

    router.get("/", function(req, res, next) {
        console.log('result: ' + rows[0]);
                res.render("index3", { 
                  data: rows,
                  title: 'index4 テスト'
                 });
    });
    // return router;
// };
module.exports = router;