var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $state, ProfileInfo){
  $scope.data = {};
  $scope.data.username = $state.params.username;
  $scope.data.username = ProfileInfo.profile.username || 'Robert';
  $scope.data.gardenName = '';
  $scope.data.nickname;
  $scope.data.plantDate;
  $scope.data.plantStatus;
  $scope.data.idOfGarden;
  $scope.gardens = {};
  $scope.count = 0;
  $scope.resultPlants;
  $scope.lists;
  
  //figure out how to lock down certain gardens
  $scope.dropCallback = function(event, index, item, external, type){
    var plant = {plantId: item.plantId};
    var garden = {gardenName: item.bucket};
    Plants.addGardenToPlant(plant, garden)
  }

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
          $scope.gardens[results[i].id] = results[i].gardenName
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
            // console.log(results, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname    = results.data[i].nickname;
              obj.plantDate   = results.data[i].plantDate;
              obj.plantStatus = results.data[i].plantStatus;
              obj.idOfGarden  = results.data[i].idOfGarden;
              obj.plantId     = results.data[i].id;
              obj.speciesId   = results.data[i].idOfSpecies;
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

        obj[cur.idOfGarden] = { label: $scope.gardens[cur.idOfGarden],
                                plants: []
                              }
        return obj
        }, { 0: { label: "To Plant!", plants: [] }} //object to reduce to starts with area for unplanted plants
      );
      return res;
    };


  $scope.formatGardenForSandbox = function(){
    $scope.resultPlants.forEach(function(element){
      // console.log(element)
      if(element.idOfGarden === ""){
        $scope.lists[0].plants.push({
                                      name: element.nickname,
                                      gardenId: element.idOfGarden,
                                      plantId: element.plantId,
                                      speciesId: element.speciesId
                                    })
      } else{
        $scope.lists[element.idOfGarden].plants.push({
                                      name: element.nickname,
                                      gardenId: element.idOfGarden,
                                      plantId: element.plantId,
                                      speciesId: element.speciesId
                                                     })
      }
    })
  };

  $scope.getUserPlants();
  $scope.getUsersGardens();
  $scope.getSpecifcGardenPlants();
}])
