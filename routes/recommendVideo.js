const bodyParser = require('body-parser');
const mecab = require('mecab-ya');
const app = require('express')();
const http = require('http');
const server = require('http').createServer(app);
const async = require('async');

app.post('/recommendVideo',  async (req, res, next) => {
  const message = req.body.message;
  let _keyword = '';
  let keyword = {};
  let _result = new Object();
  global._result = _result;

  await mecab.nouns(JSON.stringify(message), function (err, result) {
    resultMecab = result;
    keyword = resultMecab.reduce((t, a) => {
      t[a] = (t[a] || 0) + 1 
      return t }, {})
    
    let max = 0;

    // for in 문 으로 json Object 출력
    for(var key in keyword) {
      if (keyword[key] >= max) {
        _keyword = key;
        max = keyword[key];
      }
    }
    
    _result.keyword = _keyword;

    return res.r(_result);
  }); 
}); 

module.exports = app;
