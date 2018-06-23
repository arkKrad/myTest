'user strict'

var request = require('supertest');
var app = require('../app');

var db = require('../common/db_module')

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon')
var config = require('config')

let dummyConfig =
{
    "test" : "test",
    "num": 0,
    "host": "127.0.0.1",
    "user": "root",
    "password": "stub",
    "database": "test",
    "dateStrings": "true"
}

var stub = sinon.createSandbox()

afterEach(function() {
    stub.restore();
    process.exit()
  });

describe('テスト1', async function(){
    it('ケース1', async function (done) {

        var spy = sinon.spy(db, 'handle')
        try {
        // スタブ
        stub = sinon.stub(config, 'get')
        stub.returns(dummyConfig)

        // let result = await request(app)
        // .get('/db')

        // 呼び出し
        let result = await  db.handle(null)

        // console.log('結果？: ', result)
        // assert.isOk(false, '失敗')

        } catch (err) {
            // console.log('ああああああああ: ', spy.callCount)
            // console.log('errrrrrrr', err)
            // if (err instanceof AssertionError) {
            //     assert.isOk(false, '失敗')
            //     done()
            // } else {
            //     assert.isOk(true, '成功')
            //     done()
            // }
            
        }
    })
})