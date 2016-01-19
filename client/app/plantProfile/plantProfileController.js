var plantProfile = angular.module('plantProfile', []);
plantProfile.controller('plantProfileController'['$scope', 'Plants', '$state', function($scope, Plants, $state){
    $scope.data = {};
    $scope.data.commonname = $state.params.commonname;
    // $state.go('myPlants', {username: 'lizz'});
    //make sure do $state.go
    $scope.data.plantInfo;
    console.log($scope.data.commonname) //TODO: Make sure this is what we want

    $scope.data.getSpecieInfoOfPlant = function(){
      Plants.getSpecieInfo($state.data)
        .then(function(data) {
          console.log(data, 'TODO GET WHAT YOU NEED FROM THE DATA');
          $scope.data.plantInfo = data;
        })
        .catch(function(error) {
          console.log(erro, 'ERROR IN GETSPECIEINFOOFPLANT');
        })
    };



}]);
