var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $stateParams, ProfileInfo){
  $scope.data = {};
  // $scope.data.username = $state.params.username;
  // make sure to do state.go
  $scope.data.usersGardenArray = [];
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.gardenName = '';
  // $scope.data.plants;

  $scope.goToPlant = function(plant){
    $state.go('plantProfile', {nickname: plant});
  };

  $scope.getSpecifcGardenPlants= function(){
    if($scope.data.gardenName){
      Plants.getGardenPlants($scope.data)
        .then(function(results) {
          console.log(results, 'SUCCESS IN getSpecifcGardenPlants CONTROLLER');
          $scope.data.resultPlants = results;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN getSpecifcGardenPlants CONTROLLER');
        })
    }
  };


  $scope.getUserPlants = function(){
    Plants.getUsersPlants($scope.data)
          .then(function(results) {
            console.log(results, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            $scope.data.resultPlants = results;
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          });
  };

  // immediately calls this function when controller loads
 $scope.getUserPlants();


 //TODO show all the users Plants, but then be able to filter by garden (dropdown)

}]);
