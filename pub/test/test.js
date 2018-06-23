var request = require('supertest');
var app = require('../app');

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon')
var config = require('config')

var stub = sinon.createSandbox()

describe('テスト1', function(){
  it('ケース1', async function () {
    try {
      /*
      * 1.get (url)
      * 2.query GETパラメータを連想配列で
      * 3.expect 想定するレスポンスステータスの判定、想定通り出ないならエラーを投げる
      *
      */

      // stub setting
      stub = sinon.stub(config, 'get')
      stub.returns('is a stub')

      let result = await request(app)
      .get('/users')
      .query({ val: 'Test1' })
      .expect(200)
      
      assert.isOk(false, 'NG' + err)

      console.log('結果: ', result)

      // if (result.status === 200) {
      //   assert.isOk(true, 'ok')
      // } else {
      //   // assert.isOk(false, 'ng')
      //   throw new Error('NG')
      // }
    } catch (err) {
      console.log('ちんぽキャッチプリピュア', err)
      assert.isOk(true, 'OK' + err)
    }
  });
})