angular.module('ApData')
.controller('ChampCtrl', ['$scope', 'ChampionService', 'StaticDataService',
function($scope, ChampionService, StaticDataService){

    $scope.initializing = true;
    $scope.currentChampion = ChampionService;
    $scope.static = StaticDataService;


    $scope.static.loadChampData(function(){
      $scope.currentRegion = "NA"
      $scope.ranked = false;
      $scope.currentStat = "kills"
      $scope.selectedChampion = $scope.static.champions[0];
      $scope.currentChampion.repopulateData($scope.selectedChampion, $scope.currentRegion, $scope.ranked);
      $scope.searchText = $scope.static.champions[0].name;

      $scope.$watch(function(scope){ return scope.ranked},
                    function(){
                      $scope.currentChampion.repopulateData($scope.selectedChampion, $scope.currentRegion, $scope.ranked);
                    })
      $scope.initializing = false;
    })

    $scope.selectedChampionChange = function(champion){
      if(champion){
        if(isValidChampion(champion)){
            for(i = 0; i < $scope.static.champions.length; i++){
              if( $scope.static.champions[i].id == champion.id){
                $scope.selectedChampion = champion
                $scope.currentChampion.repopulateData($scope.selectedChampion, $scope.currentRegion, $scope.ranked);
              }
            }
        }
      }
    }

    $scope.onRegionChange = function(region){
      $scope.currentRegion = region
      $scope.currentChampion.repopulateData($scope.selectedChampion, $scope.currentRegion, $scope.ranked);

    }

    $scope.onStatChange = function(stat){
      $scope.currentStat = stat;
      $scope.currentChampion.repopulateData($scope.selectedChampion, $scope.currentRegion, $scope.ranked);

    }

    $scope.querySearch = function (query) {
      if($scope.searchText == ''){
        return $scope.champions
      }else{
        var results = query ? $scope.static.champions.filter( createFilterFor(query) ) : [];
        return results;
      }
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(champion) {
        return (angular.lowercase(champion.name).indexOf(lowercaseQuery) === 0);
      };
    }

    function isValidChampion(champion){
      for(i = 0; i < $scope.static.champions.length; i++){
        if( $scope.static.champions[i].id == champion.id){
          return true;
        }
      }
      return false;
    }
}]);
