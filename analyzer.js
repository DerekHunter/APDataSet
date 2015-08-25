var fs = require('fs');

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

function analyze(basePath){
  data = {};
  data.items = {}
  data.champions = {}
  gameFiles = fs.readdirSync(basePath);
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
      //console.log(champions[champion]);
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

data = analyze('5.11/BR/')

console.log(data.items[3050]);
