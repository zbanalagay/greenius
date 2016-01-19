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
      data: user
    }).then(function(response) {
      console.log('SUCCESFUL GET FOR GETUSERSPLANTS');
    }).catch(function(error) {
      console.log(error, 'ERROR IN GETUSERSPLANTS FACTORY');
    })
  }

  var getSpecieInfo = function (plant){
    return $http({
      method: 'GET',
      url: '/api/plants/loadSpecieInfo',
      data: plant
    }).then(function(response) {
      console.log('SUCCESFUL GET FOR GETSPECIEINFO');
    }).catch(function(error) {
      console.log(error, 'ERROR IN GETSPECIEINFO FACTORY');
    })
  }
  return {
    addPlant: addPlant,
    getUsersPlants: getUsersPlants,
    getSpecieInfo: getSpecieInfo
  }
}]);

//populate once we have our cookie (and once our cookies are figured out)
//this will make it easy to remember info about the user, so you can just pass around this factory
services.factory('ProfileInfo', ['$http', function($http){
  var profile = {
    username: undefined
    // TODO: FINISH THIS
  }

  var getProfile = function() {
    // TODO: FINISH THIS
  }

  var setProfile = function() {
    // TODO: FINISH THIS
  }

  return{
    getProfile: getProfile,
    setProfile: setProfile
  }
}])
