var services = angular.module('services', []);
services.factory('Plants', ['$http', function($http){

  var addPlant = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/addPlant',
      data: plant
    }).then(function(response) {
      console.log('SUCCESSFUL POST FOR ADDPLANT');
    }).catch(function(error) {
      console.log(error, 'ERROR IN ADDPLANT FACTORY');
    });
  }

  var getUsersPlants = function(user){
    return $http({
      method: 'GET',
      url: '/api/plants/loadPlants',
      params: user
    }).then(function(response) {
      console.log('SUCCESFUL GET FOR GETUSERSPLANTS');
    }).catch(function(error) {
      console.log(error, 'ERROR IN GETUSERSPLANTS FACTORY');
    })
  }

  return {
    addPlant: addPlant,
    getUsersPlants: getUsersPlants
  }
}]);
