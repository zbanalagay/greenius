var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['$scope', 'Plants','ProfileInfo',function($scope, Plants, ProfileInfo){
  $scope.data = {};

  // TODO finalize how plant will be passed in based on view input and put it on $scope
    $scope.data.commonName = '';
    $scope.data.specieResults;
    $scope.data.nickname = '';
    $scope.data.username = ProfileInfo.profile.username;
    $scope.data.botanicalName;
    $scope.plantInfoPrompts = false;
    $scope.promptToAddPlant = false;
    $scope.gardenPrompt = false;
    // TODO need to fix for later w calendar stuff, for now itll be true
    $scope.data.plantStatus = true;
    // TODO need to tell user how to format
    $scope.data.plantDate = ProfileInfo.profile.plantDate;
    // $scope.data.gardenName = ProfileInfo.profile.gardenName;
    $scope.data.gardenName = '';
    $scope.data.usersGardenArray = [];
    $scope.data.plantArray = [];

    //TODO: TEST WHEN WE HAVE users in our database

    // Gets all the gardens that belong the user to populate the existing garden table
    // $scope.getExistingGardens = function(){
    //     Plants.getUserGardens($scope.data)
    //       .then(function(results) {
    //         console.log(results, 'SUCCESS IN GETEXISTINGGARDS'); //TODO: GET WHAT YOU NEED FROM RESULTS
    //         $scope.data.usersGardenArray = results;
    //       })
    //       .catch(function(error) {
    //         console.log(error, 'ERROR IN GETGARDENFACTORY');
    //       })
    // };
    // // invoke immediately when controller is loaded
    // $scope.getExistingGarden();

    // this will query the speciesInfo to get the plant they are interested in
    $scope.browse = function(){
      if($scope.data.commonName){
        console.log($scope.data, 'CONSOLE.LOG BROWSEPLANT SCOPEDATAPLANT');
        Plants.getSpecieInfo($scope.data)
          .then(function(data) {
            console.log(data.commonName, data.botanicalName, 'BROWSE DATA')
            $scope.data.commonName = data.commonName;
            $scope.data.botanicalName = data.botanicalName;
            $scope.userWantsToAddPlant();
          })
          .catch(function(err) {
            console.log(err, 'ERROR IN BROWSE FUNCTION')
          })
      }
    };

    //this is for the ng-if prompt, appears= if user wants to plant this plant
    $scope.userWantsToAddPlant = function(){
      $scope.promptToAddPlant = !($scope.promptToAddPlant);
      // console.log("TO SHOW BUTTON ADDPLANT QUEST",$scope.promptToAddPlant);
    };

    // this is for the ng-if prompt, appears = user choses which garden to add to
    $scope.userChoseGarden = function(){
      $scope.gardenPrompt = !($scope.gardenPrompt);
    };

    //this is for the ng-if prompt, appears tell the user to name the plant and startdate
    $scope.specificPlantInfoPrompts = function(){
      $scope.plantInfoPrompts = !($scope.plantInfoPrompts);
      // console.log("TO SHOW FIELDS $scope.plantInfoPrompts",$scope.plantInfoPrompts);
    };

    // checks if the garden exists or not, if it doesnt then adds the Garden
    $scope.selectGarden = function(){
      if($scope.data.gardenName){
        //TODO put back this if statement and its closing bracket once users can have multiple gardens
        // if($scope.data.usersGardenArray.indexOf($scope.data.gardenName) === -1){
          //addGarden
          Plants.addGarden($scope.data)
            .then(function(results) {
              console.log(results, 'SUCCESS IN SELECTGARDEN');
              //TODO: GET WHAT YOU NEED FROM RESULTS
              $scope.getGardenPlants();
            })
            .catch(function(error) {
              console.log(error, 'ERROR IN SELECTGARDEN CONTROLLER')
            })
        // }

        $scope.specificPlantInfoPrompts();
      }
    }

    $scope.getGardenPlants = function(){
      console.log($scope.data.gardenName, 'oh hay')
      Plants.getGardenPlants($scope.data)
        .then(function(results) {
          console.log(results, 'SUCCESS IN GETGARDENPLANTS CONTROLLER');
            $scope.data.plantArray = results;
        })
        .catch(function(error) {
          console.log(error, 'ERROR INSIDE GETGARDENPLANTS');
        })
    }
    //adds the plant to the database
    $scope.addPlant = function(){
      if($scope.data.nickname){
        Plants.addPlant($scope.data)
          .then(function(results){
            console.log(results, 'SUCCESS IN ADDINPLANT ADDPLANT CONTROLLER');
            $scope.getGardenPlants();
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN ADDPLANT CONTROLLER')
          })
        // resets value, in case user wants to add another plant
        // $scope.promptToAddPlant = false;
      } else{
        alert('You must enter a plant');
      }
    };

}]);
