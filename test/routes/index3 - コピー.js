var express = require('express');
var mysql = require('../model/contest');

// module.exports = function() {
  console.log('start');
  var query = 'SELECT * FROM content';
  var router = express.Router();
  router.get("/", function(req, res, next) {
    // var query = 'SELECT * FROM content';
    mysql.getOne(query, null, function(result) {
      console.log('result: ' + result);
      if (result) {
        // 成功(jsonを返すなど)
        res.render('index2', { 
          data: result,
          title: 'テスト'
         });
         next();
      } else {
          // 失敗(jsonを返すなど)
          console.log('error');
      }
    }
  )
  console.log('end');
  // return router;
  });
// }

module.exports = router;