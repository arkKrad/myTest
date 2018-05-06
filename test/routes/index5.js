var express = require("express");
var mysql = require("../common/db2.js");
var mysql2 = require("../common/db3.js");

/** DBモジュールに対しての取得処理を呼び出して結果の表示
 *  ※ コネクションプール系統
 *  app → router → db → router → html(結果)
 */

let router = express.Router();

let query = 'SELECT * FROM content';
let result, con;

// DB接続と取得
// 先にプールの接続を使った試し
// プールクラスターは構造はプールと同じ系統
mysql2.poolExec(query).then(value => {
    console.dir('val: ' + value);
    con = value;
});

// コネクションプールクラスターを利用
// con = mysql.connectPool3();

// 普通のコネクション接続
// let con = mysql.connect();

// コネクションの確認の出力
console.dir('con: ' + con);

result = con;
// result = mysql.getAll(con,query,[]);
mysql.getAll(con,query,[], function(result){

//    mysql.conEnd(con);
    mysql2.conRelease(con);

    router.get("/", function(req, res, next) {
        console.log('result: ' + result);
        res.render("index3", { 
            data: result,
           title: 'index5 テスト'
        });
    });

});

module.exports = router;