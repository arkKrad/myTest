let express = require("express");
let redis = require('../common/redis_module');

/** 
 *  redis logic example
 */

let router = express.Router();

async function main() {
    // GET ACCESS
    router.get("/", async function(req, res, next) {
        let key = 'hash_test3';
        let value;

        // // Array設定
        // value.push('test1');
        // value.push([1,2,3])
        // value.push([4,'aaa',[5,6]])

        // Hash設定
        value = {
            id:'3',
            name:'TEST',
            arr:[1,2,3]
        };

        // 接続
        redis.connect();

        // 登録
        // ArrayやHashはJson文字列に変換すれば登録出来る
        // redis.set(key,JSON.stringify(value));

        // 登録したデータを呼び出す
        // let result = await redis.get(key);

        /* 以下ハッシュ値の登録と取得のロジック */
        // 登録
        // 連想配列まるごと登録
        redis.setObj2(key,value);
        console.log(Object.keys(value))
        // 連想配列をばらして個々に同一キーで登録
        // Object.keys(value).forEach(function(objKey) {
        //     redis.setObj(key, objKey, value[objKey].toString())
        // });

        let objKey = 'id'
        // 取得
        // let result = await redis.getObj(key)
        let result = await redis.getObj2(key, objKey)

        console.log('redis result');
        console.log(result);

        // パースするとしぬ 登録とか使い方が悪かった奴
        // console.log('redis result perce');
        // console.log(JSON.perce(result));

        res.render("redis_view", { 
            data: result,
            title: 'redis テスト'
        });
    });
}

main();

module.exports = router;