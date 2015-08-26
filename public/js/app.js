angular.module('ApData', ['ngMaterial', 'ngRoute', "chart.js"]).config(['$routeProvider', '$mdThemingProvider',
  function($routeProvider, $mdThemingProvider){
      $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('yellow')
      .backgroundPalette('grey');
}]);
