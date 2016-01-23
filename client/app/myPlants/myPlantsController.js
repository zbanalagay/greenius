var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $state, ProfileInfo){
  $scope.data = {};
  // $scope.data.username = $state.params.username;
  // make sure to do state.go
  $scope.data.usersGardenArray = [];
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.gardenName = '';
  $scope.data.nickname;

  // $scope.data.plants;

  var changeState = function (plant){
    $state.go('plantProfile', {nickname: plant});
  };

  $scope.goToPlant = function(name){
    console.log(name, "IWEJIJOWROJEIRWEOIRJWEOJ#@")
    $scope.data.nickname = name;
    changeState($scope.data.nickname);
  };

  $scope.getSpecifcGardenPlants= function(){
    if($scope.data.gardenName){
      Plants.getGardenPlants($scope.data)
        .then(function(results) {
          console.log(results, 'SUCCESS IN getSpecifcGardenPlants CONTROLLER');
          $scope.resultPlants = results;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN getSpecifcGardenPlants CONTROLLER');
        })
    }
  };


  $scope.getUserPlants = function(){
    var tempArray = [];
    console.log($scope.data, "GETETETETTET")
    Plants.getUsersPlants($scope.data)
          .then(function(results) {
            console.log(results.data, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname = results.data[i].nickname;
              console.log(obj, "OH HAY")
              tempArray.push(obj);
            }
            $scope.resultPlants = tempArray;

          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          });
  };

  // immediately calls this function when controller loads
 $scope.getUserPlants();


 //TODO show all the users Plants, but then be able to filter by garden (dropdown)

}]);
