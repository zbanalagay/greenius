var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $state, ProfileInfo){
  $scope.data = {};
  // $scope.data.username = $state.params.username;
  $scope.data.username = ProfileInfo.profile.username;
  $scope.data.gardenName = '';
  $scope.data.nickname;
  $scope.gardenArray=[];
  $scope.count = 0;
}])