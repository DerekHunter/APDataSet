var express = require('express');
var https = require('https')
var router = express.Router();
var app = express();

apiKey = ''

var staticChampData = {}
var staticItemData = {}

https.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key='+apiKey, function(res) {
  champBuffer = ''
  res.on('data', function(data){
    champBuffer += data
  });
  res.on('end', function(err){
    staticChampData = JSON.parse(champBuffer).data;
    console.log("Loaded Champ Data")
  })
});

https.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key='+apiKey, function(res) {
  itemBuffer = ''
  res.on('data', function(data){
    itemBuffer += data
  });
  res.on('end', function(err){
    staticItemData = JSON.parse(itemBuffer).data;
    console.log("Loaded Item Data")
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
