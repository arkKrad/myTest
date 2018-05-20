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
var id = '';

// 1.一般のコネクション取得
// コネクション取得
async function main() {
    await db.connect();

    result = await db.get(query, []);

    // console.log(result);

    var testArr = []
    for (var i = 0; i < 10; i++) {
        var testData = {
            content_id: i,
            channel_id: '100' + i.toString(),
            content_name: 'どこでものテスト' + i.toString(),
            colarr: [1,2,3,4,5],
            colhash: {test: 1, test2:2},
            note: 'pc,sp,fp',
            note2: 'pc',
            create_user: 'test_user20',
            create_date: '2018-04-28 13:53:00',
            update_user: 'test_user20',
            update_date: '2018-04-28 13:53:00',
            flg: false,
            nul: null,

        }

        testArr.push(testData);
    }

    await testfunc(testArr);

    router.get("/", function(req, res, next) {
    // console.dir('result: ' + result);

        res.render("index_s", { 
            data: result,
            title: 'indexS テスト',
            id: id,
            test: testArr
        });
    });
}

async function testfunc(data) {
    console.log('データ実験開始')

    for (let i = 0; i < data.length; i++) {
        var row = data[i];

        await Object.keys(row).forEach( async function(key) {
            console.log('key: ', key)
            console.log('rowkey: ', row[key])
            if (row[key] !== null && typeof row[key] !== 'undefined') {
             if (typeof row[key] === 'object') {
                if (row[key] instanceof Array) {
                    console.log('配列: ', row[key])
                    row[key].forEach(val => {
                        console.log('中身: ', val)
                    });
                } else {
                    console.log('連想配列: ', row[key])
                    await Object.keys(row[key]).forEach( function(val) {
                        console.log('key: ', val)
                        console.log('中身: ', row[key][val])
                    });
                }
             }  else {
                 if (typeof row[key] !== 'boolean') {
                    row[key].toString().split(',').forEach( function(val) {
                        console.log('取り敢えず文字列: ', val)
                    });
                 } else {
                    console.log('ブーリアン: ', row[key])
                 }
             }  
            } else {
                console.log('err: ', row[key])
            }
        });
        
    }

    console.log('データ実験終了')
} 

main();

module.exports = router;