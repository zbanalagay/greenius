var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $state, ProfileInfo){
  $scope.data = {};
  // $scope.data.username = $state.params.username;
  // make sure to do state.go
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.gardenName = '';
  $scope.data.nickname;
  $scope.gardenArray=[];
  // $scope.data.plants;
  $scope.count = 0;

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
          $scope.count++;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN getSpecifcGardenPlants CONTROLLER');
        })
    }
  };

  $scope.getUsersGardens = function(){
    Plants.getUserGardens($scope.data)
      .then(function(results) {
        console.log(results, 'SUCCES IN GETUSERSGARDENS CONTROLLER');
        for(var i = 0; i< results.length; i++){
          var temp = results[i].gardenName;
          if($scope.gardenArray.indexOf(temp)===-1){
            $scope.gardenArray.push(temp);
          }
        }
      })
      .catch(function(error) {
        console.log(error, 'ERROR IN GETUSERSGARDENS CONTROLLER');
      })
  }

  $scope.getUserPlants = function(){
    var tempArray = [];
    console.log($scope.data, "GETETETETTET")
    Plants.getUsersPlants($scope.data)
          .then(function(results) {
            console.log(results.data, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname = results.data[i].nickname;
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
  $scope.getUsersGardens();

 //TODO show all the users Plants, but then be able to filter by garden (dropdown)

}]);
