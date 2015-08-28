angular.module('ApData').factory('StaticDataService',['$http', function($http) {
   var StaticData = {};

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
       console.log(StaticData.champions)
       StaticData.statistics = ["Kills", "Deaths", "Assists"]
       StaticData.regions = ['NA', 'OCE', 'EUNE', 'BR']
       callback();
     })
   }

   StaticData.loadItemData = function(callback){
     $http.get('http://localhost:3000/api/static/champions').then(function(response){
       for( champion in response.data){
         champ = {}
         champ.id = response.data[champion].id;
         champ.name = response.data[champion].name;
         champ.image = response.data[champion].image.full;
         StaticData.champions.push(champ);
       }
       console.log(StaticData.champions)
       StaticData.statistics = ["Kills", "Deaths", "Assists"]
       StaticData.regions = ['NA', 'OCE', 'EUNE', 'BR']
       callback();
     })
   }

   return StaticData;
 }]);
