var plantProfile = angular.module('plantProfile', []);
plantProfile.controller('plantProfileController',['$scope', 'Plants', '$state', function($scope, Plants, $state){
    $scope.data = {};
    $scope.data.nickname = $state.params.nickname;
    // $state.go('myPlants', {username: 'lizz'});
    //make sure do $state.go
    $scope.data.plantInfo;
    console.log($scope.data.nickname) //TODO: Make sure this is what we want

    $scope.data.getSpecieInfoOfPlant = function(){
      Plants.getSpecieInfo($scope.data)
        .then(function(data) {
          console.log(data, 'TODO GET WHAT YOU NEED FROM THE DATA');
          $scope.data.plantInfo = data;
        })
        .catch(function(error) {
          console.log(erro, 'ERROR IN GETSPECIEINFOOFPLANT');
        })
    };

    //immediately called when controller is loaded 
    $scope.data.getSpecieInfoOfPlant();



}]);
