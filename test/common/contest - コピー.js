var mysql = require("mysql");
module.exports = {
    conn: null,

    // MySQLへ接続
    connect: function() {
        this.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'admin',
            database: 'test'
        });
        this.conn.connect(function(err) {
            if (err) {
                // MySQLへ接続失敗
                console.log('sql connect error: ' + err)
            } else {
                // MySQLへ接続成功
                console.log('MySQL connect')
            }
        });
    },

    // 1件取得用メソッド
    getOne: function(query, params, callback) {
        this.conn.query(query, params, function(err, rows) {
            if (err){
              console.log('exec error: ' + err)
            }
            else {
              callback(rows.length < 1 ? rows[0] : rows[0]);
            }
        });
    },

    // 複数件取得用メソッド
    getAll: function(query, params, callback) {
        this.conn.query(query, params, function(err, rows) {
          if (err){
            console.log('exec error: ' + err)
          }
          else {
            callback(rows);
          }
        });
    }
}