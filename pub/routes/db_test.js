let express = require("express");
let db = require("../common/db_module");

let router = express.Router();

async function test() {
    /* GET home page. */
  router.get('/', async function(req, res, next) {

    try {
      let query = 'SELECT * FROM content';

      await db.connect()
  
      await db.get(query, [])
  
      console.log('aaaaaaa')
      res.render('index',
      {
        title: 'Express'
      });
    } catch (err) {
      throw err
    }
  });
}

test();
    
module.exports = router;