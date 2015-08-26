angular.module('ApData').factory('StaticDataService', function() {
   var StaticData = {};

   StaticData.champions =[
     {id:"1", display: "Veigar"},
     {id:"2", display: "Riven"},
     {id:"3", display:"Jinx"}
   ];

   StaticData.regions = ['NA', 'OCE', 'EUNE', 'BR']

   return StaticData;
 });
