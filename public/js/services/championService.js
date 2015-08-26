angular.module('ApData').factory('ChampionService', function() {
   var ChampionService = {};

   ChampionService.isLoading = true;

   ChampionService.setCurrentChampion = function(id){
      ChampionService.isLoading = true
      ChampionService.labels = ['a',"b","c","d","e","f","g","h","i"]
      ChampionService.data = [[5,2,3,4,2,1,2,3,4],
                                [2,3,4,2,1,3,6,7,8]]
      ChampionService.isLoading = false;
      ChampionService.id = id;
      ChampionService.isLoading = false;
   }

   return ChampionService;
 });
