angular.module('ApData')
.controller('ExploreCtrl',['$scope', 'ChampionService', 'StaticDataService',
function($scope, ChampionService, StaticDataService){

    $scope.currentChampion = ChampionService;
    $scope.static = StaticDataService;

    $scope.currentRegion = "NA"
    $scope.ranked = false;
    $scope.currentStat = "kills"
    $scope.currentChampion.repopulateData(1, $scope.currentRegion, $scope.ranked);


    $scope.searchText = $scope.static.champions[0].display;

    $scope.$watch(function(scope){ return scope.ranked},
                  function(){
                    $scope.currentChampion.repopulateData($scope.currentChampion.id, $scope.currentRegion, $scope.ranked, $scope.currentStat);
                  })

    $scope.selectedChampionChange = function(champId){
      if(isValidChampion(champId)){
          for(i = 0; i < $scope.static.champions.length; i++){
            if( $scope.static.champions[i].id == champId){
              $scope.searchText = $scope.static.champions[i].display
              $scope.currentChampion.repopulateData($scope.static.champions[i].id, $scope.currentRegion, $scope.ranked, $scope.currentStat);
            }
          }
      }
    }

    $scope.onRegionChange = function(item){
      $scope.currentRegion = item
      $scope.currentChampion.repopulateData($scope.currentChampion.id, $scope.currentRegion, $scope.ranked, $scope.currentStat);
    }

    $scope.onStatChange = function(stat){
      $scope.currentStat = stat;
      $scope.currentChampion.repopulateData($scope.currentChampion.id, $scope.currentRegion, $scope.ranked, $scope.currentStat);
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
        return (angular.lowercase(champion.display).indexOf(lowercaseQuery) === 0);
      };
    }

    function isValidChampion(name){
      for(i = 0; i < $scope.static.champions.length; i++){
        if( $scope.static.champions[i].id == name){
          return true;
        }
      }
      return false;
    }
}]);
