angular.module('ApData', ['ngMaterial', 'ngRoute']).config(['$routeProvider',
  function($routeProvider, $mdThemingProvider){
    $routeProvider.
      when('/analysis',{
        templateUrl: 'partials/analysis.html',
        controller: 'AnalysisCtrl'
      }).
      otherwise({
        redirectTo:'/analysis'
      });

      $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
}]);
