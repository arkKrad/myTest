var express = require("express");
var mysql = require("../common/db2.js");

/** DBモジュールに対しての取得処理を呼び出して結果の表示
 *  ※ コネクションプールクラスター
 *  app → router → db → router → html(結果)
 */

let router = express.Router();

let query = 'SELECT * FROM content';
let result, con;

// DB接続と取得
// プールクラスターでの接続
 /* javaみたいに変数にコネクション入れて
  * それを使ってみたいなのは旨くいってない
  */
mysql.connectPool2(query).then(value => {

    con = value;

    // コネクションの確認の出力
    console.dir('con: ' + con);

    mysql.getAll(con,query,[], function(result){

    //    mysql.conEnd(con);
        mysql.conRelease(con);

        router.get("/", function(req, res, next) {
            console.log('result: ' + result);
            res.render("index3", { 
                data: result,
            title: 'index7 テスト'
            });
        });

    });
});

module.exports = router;