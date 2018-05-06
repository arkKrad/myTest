let express = require("express");
// var mysql = require("../common/db2");
let model = require('../model/model3');

/** DBモジュールに対しての取得処理を呼び出して結果の表示
 *  
 *  app → router →  model → db → router → html(結果)
 */

let router = express.Router();

let query = 'SELECT * FROM content';
let result, con;

// 1.一般のコネクション取得
// コネクション取得
// con = model.connect();

// 検索 → コネクションを閉じる
// model.get(con,query,[])
//     .then(value => {
//         result = value;
//         model.conEnd();
//     });

// router.get("/", function(req, res, next) {
//     console.log('result: ' + result);
//     res.render("index3", { 
//         data: result,
//         title: 'index8 テスト'
//     });
// });

// 2.コネクションプール
// model.connectPool()
//     .then(val => {
//         console.dir('val:' + val);
//         con = val;

//     // 検索 → コネクションを閉じる
//     model.get(con,query,[])
//         .then(value => {
//             console.dir('value:' + value);
//             result = value;

//             model.conRelease();

//             router.get("/", function(req, res, next) {
//                 console.dir('result: ' + result);

//                 res.render("index3", { 
//                     data: result,
//                     title: 'index8 テスト'
//                 });
//             });
//         });
//     })
//     .catch().catch( function (error) {
//         console.log(error);
//     });


// 3.コネクションプールクラスター
model.connectPoolCluster()
    .then(val => {
        console.dir('val:' + val);
        con = val;

    // 検索 → コネクションを閉じる
    model.get(con,query,[])
        .then(value => {
            console.dir('value:' + value);
            result = value;

            model.conRelease();

            router.get("/", function(req, res, next) {
                console.dir('result: ' + result);

                res.render("index3", { 
                    data: result,
                    title: 'index8 テスト'
                });
            });
        });
    })
    .catch().catch( function (error) {
        console.log(error);
    });

module.exports = router;