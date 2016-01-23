var dashboard = angular.module('dashboard', []);
dashboard.controller('dashboardController', ['$scope', 'Plants', 'ProfileInfo', function($scope, Plants, ProfileInfo){
  $scope.data = {};
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.plants;
  $scope.totalFlowers = 0;
  $scope.totalHousePlants = 0;
  $scope.totalFruits = 0;
  $scope.totalVegetables = 0;
  $scope.totalHerbs = 0;
  $scope.totalShrubs = 0;
  $scope.total_Flowers_HousePlant = 0;
  $scope.total_Fruits_Vegetables = 0;
  $scope.total_Herbs_Shrubs = 0;
  
  $scope.getSpecieInfo = function(index, plant){  
    Plants.getSpecieById(plant)
          .then(function(speciesResult) {
            $scope.data.plants[index].speciesInfo = speciesResult.data;
            console.log(speciesResult.data, 'SUCCESS IN GETSPECIESINFO CONTROLLER');
            $scope.getPlantStats();
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETSPECIESINFO CONTROLLER');
          });
  }

  $scope.getAllPlantsSpeciesInfo = function(array) {
    for(var i = 0; i < array.length; i++) {
      $scope.getSpecieInfo(i, array[i]);
    }    
  }
  
  $scope.getUserPlants = function(){
    Plants.getUsersPlants($scope.data)
          .then(function(plantResults) {
            $scope.data.plants = plantResults.data;
            console.log(plantResults.data, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            $scope.getAllPlantsSpeciesInfo($scope.data.plants);
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          });
  }

  $scope.getPlantStats = function(){
    for(var i = 0; i < $scope.data.plants.length; i++) {
      var curSpeciesType = $scope.data.plants[i].speciesInfo;
      console.log('This is the species type: ', curSpeciesType.typeOf);
      if(curSpeciesType.typeOf === 'Flowers') {
        $scope.totalFlowers++;
      }
      if (curSpeciesType.typeOf === 'Houseplant') {
        $scope.totalHousePlants++;
      } 
      if (curSpeciesType.typeOf === 'Fruits') {
        $scope.totalFruits++;
      } 
      if (curSpeciesType.typeOf === 'Vegetables') { 
        $scope.totalVegetables++;
      } 
      if (curSpeciesType.typeOf === 'Herbs') {
        $scope.totalHerbs++;
      } 
      if (curSpeciesType.typeOf === 'Shrubs') {
        $scope.totalShrubs++;
      } 
    }
    $scope.total_Flowers_HousePlant = $scope.totalFlowers + $scope.totalHousePlants;
    $scope.total_Fruits_Vegetables = $scope.totalFruits + $scope.totalVegetables;
    $scope.total_Herbs_Shrubs = $scope.totalHerbs + $scope.totalShrubs;
  }

  // immediately calls this function when controller loads
  $scope.getUserPlants();

}]);