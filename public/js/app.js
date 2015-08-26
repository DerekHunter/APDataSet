angular.module('ApData', ['ngMaterial', 'ngRoute', "chart.js"]).config(['$routeProvider', '$mdThemingProvider',
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
      .primaryPalette('blue-grey')
      .accentPalette('yellow')
      .backgroundPalette('grey');
}]);
