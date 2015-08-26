angular.module('ApData').controller('ExploreCtrl', ['$scope', function($scope){
    $scope.champions =[
      {value:"veigar", display: "Veigar",
        data:[[65, 59, 80, 81, 56, 55, 40],
              [28, 48, 40, 19, 86, 27, 90]]
      },
      {value:"riven", display: "Riven",
        data: [[25, 99, 85, 41, 56, 55, 40],
               [18, 28, 60, 99, 86, 27, 90]]
      },
      {value:"jinx", display:"Jinx",
        data: [[25, 29, 25, 41, 56, 95, 90],
               [18, 38, 10, 39, 86, 27, 20]]
      }
    ];

    $scope.selectedChampion = $scope.champions[0];
    $scope.searchText = null;

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.selectedItemChange = function(champion){
      console.log("Populate New Data");
    }

    $scope.querySearch = function (query) {
      if($scope.searchText == ''){
        return $scope.champions
      }else{
        var results = query ? $scope.champions.filter( createFilterFor(query) ) : [];
        return results;
      }
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(champion) {
        return (champion.value.indexOf(lowercaseQuery) === 0);
      };
    }
}]);
