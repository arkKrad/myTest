var express = require('express');
var router = express.Router();

var config = require('config')

/* GET users listing. */
router.get('/', function(req, res, next) {

  let str = config.get('config').test
  let str2 = config.get('config').num

  console.log('確認: ', str)
  console.log('確認2: ', str2)

  let test = req.query.val || null
  console.log('値: ', test)

  if (test === null) {
    // next(new Error('エラーテスト'));
    throw new Error('値が(´A｀)なのでエラー')
  }
  // res.send('respond with a resource');
  res.render('user', { title: 'Express' });
});

module.exports = router;
