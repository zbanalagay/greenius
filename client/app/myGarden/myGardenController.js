var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $state, ProfileInfo){
  $scope.data = {};
  $scope.data.username = $state.params.username;
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.gardenName = '';
  $scope.data.nickname;
  $scope.gardenArray=[];
  $scope.count = 0;
  $scope.resultPlants;

  $scope.lists = [
      {
          label: "To Plant",
          plants: [
          ]
      },
      {
          label: "Garden 1",
          plants: [
          ]
      },
      {
          label: "Garden 2",
          plants: [
          ]
      }
  ];
  
  $scope.getSpecifcGardenPlants = function(){
    if($scope.data.gardenName){
      Plants.getGardenPlants($scope.data)
        .then(function(results) {
          console.log('hi')
          // console.log(results, 'SUCCESS IN getSpecifcGardenPlants CONTROLLER');
          $scope.resultPlants = results;
          $scope.count++;
        })
        .catch(function(error) {
          console.log(error);
        })
    }
  };


  $scope.getUsersGardens = function(){
    Plants.getUserGardens($scope.data)
      .then(function(results) {
        for(var i = 0; i< results.length; i++){
          var temp = results[i].gardenName;
          if($scope.gardenArray.indexOf(temp)===-1){
            $scope.gardenArray.push(temp);
          }
        }

        $scope.formatGardenForSandbox();

      })
      .catch(function(error) {
        console.log(error);
      })
  };

  $scope.getUserPlants = function(){
    var tempArray = [];
    Plants.getUsersPlants($scope.data)
          .then(function(results) {
            // console.log(results.data, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname = results.data[i].nickname;
              tempArray.push(obj);
            }
            $scope.resultPlants = tempArray;
          })
          .catch(function(error) {
            console.log(error);
          });
  };

  $scope.deleteGarden = function(){
    if($scope.data.gardenDelete){
      Plants.deleteGarden($scope.data)
      .then(function(results) {
        console.log(results, 'RESULTS IN DELETE GARDEN CONTROLLER');
      })
      .catch(function(error){
        console.log(error, 'ERROR IN DELETE GARDEN CONTROLLER');
      })
    }
  };

  $scope.formatGardenForSandbox = function(){
     $scope.resultPlants.forEach(function(element){
        $scope.lists[0].plants.push({name: element.nickname})
      })
  };

  $scope.getUserPlants();
  $scope.getUsersGardens();
  $scope.getSpecifcGardenPlants();
}])
