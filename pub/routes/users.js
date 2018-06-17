var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

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
