var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $state, ProfileInfo){
  $scope.data = {};
  $scope.data.username = $state.params.username;
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.gardenName = '';
  $scope.data.nickname;
  $scope.data.plantDate;
  $scope.data.plantStatus;
  $scope.data.idOfGarden;


  $scope.gardenArray=[];
  $scope.count = 0;
  $scope.resultPlants;

  $scope.lists;
  
  $scope.getSpecifcGardenPlants = function(){
    if($scope.data.gardenName){
      Plants.getGardenPlants($scope.data)
        .then(function(results) {
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
        
        $scope.lists = $scope.setList($scope.resultPlants)

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
            console.log(results, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname = results.data[i].nickname;
              obj.plantDate = results.data[i].plantDate;
              obj.plantStatus = results.data[i].plantStatus;
              obj.idOfGarden = results.data[i].idOfGarden;
              // obj.gardenName = results.data[i].gardenName;
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

  $scope.setList = function(arr) {
    var res = arr.reduce(function(obj, cur, i, array) {
        if (cur.idOfGarden === '' || obj[cur.idOfGarden]) { return obj } //if theres no garden id or that gardens been seen already, continue

        obj[cur.idOfGarden] = { label: "garden #" + cur.idOfGarden,
                                plants: []
                              }
        return obj
        }, { 0: { label: "to plant", plants: [] }} //object to reduce to starts with area for unplanted plants
      );
      return res;
    };


  $scope.formatGardenForSandbox = function(){
    $scope.resultPlants.forEach(function(element){
      // console.log(element)
      $scope.lists[element.idOfGarden].plants.push({name: element.nickname})
    })
  };

  $scope.getUserPlants();
  $scope.getUsersGardens();
  $scope.getSpecifcGardenPlants();
}])
