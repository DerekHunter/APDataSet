angular.module('ApData').factory('ChampionService', function() {
   var ChampionService = {};

   ChampionService.isLoading = true;

   ChampionService.setCurrentChampion = function(id, region, ranked){

      ChampionService.isLoading = true
      ChampionService.labels = ['a',"b","c","d","e","f","g","h","i"]
      if(id == 1){
        ChampionService.data = [[5,2,3,4,2,1,2,3,4],
                                  [2,3,4,2,1,3,6,7,8]]
      }else if(id == 2){
        ChampionService.data = [[1,6,2,4,8,2,2,4,9],
                                  [2,3,4,2,1,3,6,7,8]]
      }
      if(ranked){
        ChampionService.data = [[1,6,2,4,8,2,2,4,9],
                                  [2,6,4,8,2,2,9,3,3]]
      }
      if(region == 'NA'){
        ChampionService.data = [[5,2,8,3,9,3,2,3,4],
                                  [2,3,4,2,1,3,6,7,8]]
      }

      ChampionService.isLoading = false;
      ChampionService.id = id;
      ChampionService.isLoading = false;
   }

   return ChampionService;
 });
