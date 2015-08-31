var fs = require('fs');
var db = require('monk')('localhost:27017')

function getChampData(game){
  champData = [];
  players = currentGame["participants"]
  for( player = 0; player < players.length; player++){
    tempChamp = {};
    tempChamp.champId = players[player].championId
    tempChamp.timeline = players[player].timeline
    tempChamp.kills = players[player]["stats"].kills
    tempChamp.deaths = players[player]["stats"].deaths
    tempChamp.assists = players[player]["stats"].assists
    tempChamp.totalDamageTaken = players[player]["stats"].totalDamageTaken
    tempChamp.totalTimeCrowdControlDealt = players[player]["stats"].totalTimeCrowdControlDealt
    tempChamp.totalDamageDealtToChampions = players[player]["stats"].totalDamageDealtToChampions
    tempChamp.winner = players[player]["stats"].winner
    champData.push(tempChamp);
  }
  return champData;
}

function getGameItemCounts(game){
  currentPlayers = game['participants'];
  itemCounts = {}
  for(player = 0; player<currentPlayers.length; player++){
    for(index = 1; index<=6; index++){
      if(currentPlayers[player]["stats"].hasOwnProperty(["item"+index])){
        if(itemCounts.hasOwnProperty(currentPlayers[player]["stats"]["item"+index])){
          itemCounts[currentPlayers[player]["stats"]["item"+index]] +=1;
        }else{
          itemCounts[currentPlayers[player]["stats"]["item"+index]] = 1;
        }
      }
    }
  }
  return itemCounts;
}

function analyzeItems(data){
    itemAvgs = [];
    for(item in data.items){
      tmpItem = {};
      tmpItem.patch = data.patch;
      tmpItem.region = data.region;
      tmpItem.ranked = data.ranked;
      tmpItem.cnt = data.ranked;
      tmpItem.id = item;
      for(i = 0; i < data.items[item].length; i++){
        tmpItem.cnt += data.items[item][i];
      }
      tmpItem.avgRate = tmpItem.cnt/data.numGames
      itemAvgs.push(tmpItem);
    }
    return itemAvgs
}

function analyzeChamps(data){
    championAvgs = [];
    for(champ in data.champions){
      tmpChamp = {};
      tmpChamp.patch = data.patch;
      tmpChamp.region = data.region;
      tmpChamp.ranked = data.ranked;
      tmpChamp.cnt = data.ranked;
      tmpChamp.id = champ;

      tmpChamp.kills = 0
      tmpChamp.deaths = 0
      tmpChamp.assists = 0
      tmpChamp.totalTimeCrowdControlDealt = 0
      tmpChamp.totalDamageDealtToChampions = 0
      tmpChamp.wins = 0
      tmpChamp.totalDamageTaken = 0;

      for(i = 0; i < data.champions[champ].length; i++){
        tmpChamp.kills +=  data.champions[champ][i].kills
        tmpChamp.deaths +=  data.champions[champ][i].deaths
        tmpChamp.assists +=  data.champions[champ][i].assists
        tmpChamp.totalTimeCrowdControlDealt +=  data.champions[champ][i].totalTimeCrowdControlDealt
        tmpChamp.totalDamageDealtToChampions +=  data.champions[champ][i].totalDamageDealtToChampions
        tmpChamp.totalDamageTaken +=  data.champions[champ][i].totalDamageTaken
        if( data.champions[champ][i].winner){
          tmpChamp.wins ++;
        }
      }
      tmpChamp.kills /=  data.champions[champ].length;
      tmpChamp.deaths /= data.champions[champ].length;
      tmpChamp.assists /= data.champions[champ].length;
      tmpChamp.totalTimeCrowdControlDealt /= data.champions[champ].length;
      tmpChamp.totalDamageDealtToChampions /= data.champions[champ].length;
      tmpChamp.totalDamageTaken /= data.champions[champ].length;
      tmpChamp.winRate = tmpChamp.wins / data.champions[champ].length;
      championAvgs.push(tmpChamp);
    }
    return championAvgs
}

function collect(patch, region, ranked){
  if(ranked){
      basePath = patch+'/RANKED_SOLO/'+region+'/'
  }else{
      basePath = patch+'/NORMAL_5X5/'+region+'/'
  }

  data = {};
  data.items = {}
  data.champions = {}
  data.patch = patch;
  data.region = region;
  data.ranked = ranked;
  gameFiles = fs.readdirSync(basePath);
  data.numGames = gameFiles.length;
  counts = [];
  for(game = 0; game < gameFiles.length; game++){
    currentGame = JSON.parse(fs.readFileSync(basePath+gameFiles[game]));
    //Items
    gameItems = getGameItemCounts(currentGame);
    for(var item in gameItems){
      if(data.items.hasOwnProperty(item)){
        data.items[item].push(gameItems[item])
      }else{
        data.items[item] = [];
        data.items[item].push(gameItems[item])
      }
    }
    //Champions
    champions = getChampData(currentGame);
    for(champion = 0; champion < champions.length; champion++){
      if(data.champions.hasOwnProperty(champions[champion].champId)){
        champId = champions[champion].champId
        delete champions[champion.champId]
        data.champions[champId].push(champions[champion])
      }else{
        champId = champions[champion].champId
        delete champions[champion.champId]
        data.champions[champId] = [];
        data.champions[champId].push(champions[champion]);
      }
    }
  }
  return data;
}

data = collect('5.11','BR', true)
//console.log(data.champions);
//console.log(analyzeItems(data))

champData = analyzeChamps(data)
champCollection = db.get('champions');
for(i = 0; i < champData.length; i++){
  champCollection.insert(champData[i])
}

itemData = analyzeItems(data);
itemCollection = db.get('items');
for(i = 0; i < itemData.length; i++){
  itemCollection.insert(itemData[i])
}

db.close();
