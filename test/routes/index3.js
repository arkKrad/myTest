var express = require("express");
var test = require("../model/model.js");

/** DBモジュールに対しての取得処理を呼び出して結果の表示
 *  app → router → modl → db → model → router → html(結果)
 */


// module.exports = function() {
    var router = express.Router();
    router.get("/", function(req, res, next) {
        test.getOne()
            .then(function(rows) {
                // console.log('aaa:' + rows)
                res.render("index2", { 
                  data: rows,
                  title: 'index3 テスト'
                 });
            });
    });
    // return router;
// };
module.exports = router;