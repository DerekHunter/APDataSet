var express = require('express');
var https = require('https')
var db = require('monk')('localhost:27017')
var router = express.Router();
var app = express();

champCollection = db.get('champions');
itemCollection = db.get('items');

apiKey = ''
if(apiKey == ''){
  console.log("Not a valid api key");
}
var staticChampData = {}
var staticItemData = {}

https.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key='+apiKey, function(res) {
  champBuffer = ''
  res.on('data', function(data){
    champBuffer += data
  });
  res.on('end', function(err){
    staticChampData = JSON.parse(champBuffer).data;
    console.log("Loaded Champ Data")
  })
});

https.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=image&api_key='+apiKey, function(res) {
  itemBuffer = ''
  res.on('data', function(data){
    itemBuffer += data
  });
  res.on('end', function(err){
    staticItemData = JSON.parse(itemBuffer).data;
    console.log("Loaded Item Data")
  })
});

router.get('/champion/:id/', function(req, res){
  champCollection.find({id:req.params.id}, function(err, docs){
    res.json(docs)
  })
});

router.get('/item/:id/', function(req, res){
  itemCollection.find({id:req.params.id}, function(err, docs){
    res.json(docs)
  })
});

router.get('/static/champions',function(req, res){
  res.json(staticChampData);
});

router.get('/static/items',function(req, res){
  res.send(staticItemData)
});

app.use(express.static('public'));

app.use('/api', router);



var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});
