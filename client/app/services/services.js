var services = angular.module('services', []);
services.factory('Plants', ['$http', function($http){

  var addPlant = function(plant) {
    return $http({
      method: 'POST',
      url: '/api/plants/addPlant',
      data: plant
    }).then(function(response) {
      console.log(response, 'SUCCESSFUL POST FOR ADDPLANT');
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
      console.log(response, 'GETUSERSPLANTS PLANTS FACTORY')
      return response.data //TODO: find what we need on the response.data
    }).catch(function(error) {
      console.log(error, 'ERROR IN GETUSERSPLANTS FACTORY');
    })
  }

  var getSpecieInfo = function (plant){
    return $http({
      method: 'POST',
      url: '/api/plants/loadSpecieInfo',
      data: plant
    }).then(function(response) {
      console.log(response.data,'SUCCESFUL GET FOR GETSPECIEINFO');
      return response.data //TODO: find what we need on the response.data
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

services.factory('Users', ['$http', function($http){

  var addUser = function(userObj) {
    return $http({
      method: 'POST',
      url: 'api/users/addUser',
      data: userObj
    }).then(function(response) {

      console.log('SUCCESSFUL POST FOR ADDUSER');

      // Once complete, clear the form (except location)
      $scope.formData.username = '';
      $scope.formData.password = '';
      $scope.formData.email = '';
      $scope.formData.userPic = '';
    }).catch(function(error) {
      console.log('ERROR FOR ADDUSER', error);
    });
  }

  return {
    addUser: addUser
  }
}]);

//populate once we have our cookie (and once our cookies are figured out)
//this will make it easy to remember info about the user, so you can just pass around this factory
services.factory('ProfileInfo', ['$http', function($http){
  var profile = {
    // Below is for MVP testing purposes
    username: 'Lizz',
    gardenName: 'Eden'

    // Real one to populate
    // username: undefined,
    // gardenName: undefined
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
    setProfile: setProfile,
  // Below is for MVP testing purposes
    profile: profile
  }

}]);
