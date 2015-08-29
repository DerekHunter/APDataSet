angular.module('ApData')
.controller('ItemCtrl', ['$scope', 'StaticDataService',
function($scope, StaticDataService){

  $scope.initializing = true;
  $scope.static = StaticDataService;

  $scope.static.loadItemData(function(){
    $scope.currentRegion = "NA"
    $scope.ranked = false;
    $scope.searchText = $scope.static.items[0].name;
    $scope.currentItem = $scope.static.items[0];
    $scope.$watch(function(scope){ return scope.ranked},
    function(){
      console.log("Ranked item change")
    })
    $scope.initializing = false;
  })

  $scope.selectedItemChanged = function(item){
    if(item){
      if(isValidItem(item)){
        for(i = 0; i < $scope.static.items.length; i++){
          if( $scope.static.items[i].id == item.id){
            $scope.currentItem = $scope.static.items[i];
            $scope.currentItem.labels = ['a',"b","c","d","e","f","g","h","i"]
            $scope.currentItem.data = [[1,6,2,4,8,2,2,4,9],
            [2,6,4,8,2,2,9,3,3]]
          }
        }
      }
    }
  }

  $scope.onRegionChange = function(region){
    $scope.currentRegion = region
  }

  $scope.onStatChange = function(stat){
    $scope.currentStat = stat;
  }

  $scope.querySearch = function (query) {
    var results = query ? $scope.static.items.filter( createFilterFor(query) ) : [];
    return results;
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(item) {
      if(item.name == null){
        return false;
      }
      return (angular.lowercase(item.name).indexOf(lowercaseQuery) === 0);
    };
  }

  function isValidItem(item){
    for(i = 0; i < $scope.static.items.length; i++){
      if( $scope.static.items[i].id == item.id){
        return true;
      }
    }
    return false;
  }
}]);
