var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['$scope', 'Plants', '$stateParams', function($scope, Plants, $stateParams){
  $scope.data = {};
  $scope.data.username = $stateParams.username;
  console.log($scope.data.username); //TODO: Make sure this is what we want
  $scope.data.plants;
  
  $scope.getUserPlants = function(){
    Plants.getUserPlants($scope.data.username)
          .then(function(resultData) {
            $scope.data.plants = resultData;
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          })
  }
}]);
