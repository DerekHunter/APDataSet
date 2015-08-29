angular.module('ApData').factory('StaticDataService',['$http', function($http) {

   var StaticData = {};

   StaticData.regions = ['NA', 'OCE', 'EUNE', 'BR']
   StaticData.statistics = ["Kills", "Deaths", "Assists"]
   StaticData.champions =[];

   StaticData.loadChampData = function(callback){
     $http.get('http://localhost:3000/api/static/champions').then(function(response){
       for( champion in response.data){
         champ = {}
         champ.id = response.data[champion].id;
         champ.name = response.data[champion].name;
         champ.image = response.data[champion].image.full;
         StaticData.champions.push(champ);
       }
       callback();
     })
   }

   StaticData.items =[];
   StaticData.loadItemData = function(callback){
     $http.get('http://localhost:3000/api/static/items').then(function(response){
       for( item in response.data){
         tmpItem = {}
         tmpItem.id = response.data[item].id;
         tmpItem.name = response.data[item].name;
         tmpItem.image = response.data[item].image.full;
         StaticData.items.push(tmpItem);
       }
       callback();
     })
   }

   return StaticData;
 }]);
