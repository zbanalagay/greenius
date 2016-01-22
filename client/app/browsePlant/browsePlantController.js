var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['$scope', 'Plants','ProfileInfo','$state' ,function($scope, Plants, ProfileInfo,$state){
  $scope.data = {};

  // TODO finalize how plant will be passed in based on view input and put it on $scope
    $scope.data.commonName = '';
    $scope.data.specieResults;
    $scope.data.nickname = '';
    $scope.data.username = ProfileInfo.profile.username;
    $scope.data.botanicalName = '';
    $scope.plantInfoPrompts = false;
    $scope.promptToAddPlant = false;
    $scope.gardenPrompt = false;
    // TODO need to fix for later w calendar stuff, for now itll be nursery
    $scope.data.plantStatus = 'nursery';
    // TODO need to tell user how to format
    $scope.data.plantDate = ProfileInfo.profile.plantDate;
    // $scope.data.gardenName = ProfileInfo.profile.gardenName;
    $scope.data.gardenName = '';
    $scope.usersGardenArray = [];
    $scope.data.plantArray = [];
     $scope.showModal= false;
     $scope.tracker = false;



    // Gets all the gardens that belong the user to populate the existing garden table
    $scope.getExistingGardens = function(){
      var gardenArray = [];
        Plants.getUserGardens($scope.data)
          .then(function(results) {
            console.log(results, 'SUCCESS IN GETEXISTINGGARDS');
            for(var j = 0; j< results.length; j++){
              var garden = results[j].gardenName;
              if(gardenArray.indexOf(garden) === -1){
                gardenArray.push(garden);
              }
            }
            $scope.usersGardenArray = gardenArray;
            console.log($scope.usersGardenArray);

          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETGARDENFACTORY');
          })
    };
    // invoke immediately when controller is loaded
    $scope.getExistingGardens();

    $scope.goToPlant = function(plant){
      $state.go('plantProfile', {nickname: plant});
    };

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

    $scope.plantsInGardenTracker = function(){
      $scope.tracker = true;
    }
    // checks if the garden exists or not, if it doesnt then adds the Garden
    $scope.selectGarden = function(){
      if($scope.data.gardenName){
        //TODO put back this if statement and its closing bracket once users can have multiple gardens
        if($scope.data.usersGarden != $scope.data.gardenName){
          //addGarden

          //TODO check that user only inputed in one field
          Plants.addGarden($scope.data)
            .then(function(results) {
              console.log(results, 'SUCCESS IN SELECTGARDEN');
              //TODO: GET WHAT YOU NEED FROM RESULTS
              $scope.getGardenPlants();
            })
            .catch(function(error) {
              console.log(error, 'ERROR IN SELECTGARDEN CONTROLLER')
            })
        }

        $scope.specificPlantInfoPrompts();
      }
    }

    $scope.getGardenPlants = function(){
        var nicknameArray= [];
        var plantDateArray = [];
        var plantStatusArray = [];
      console.log($scope.data.gardenName, 'oh hay')
      Plants.getGardenPlants($scope.data)
        .then(function(results) {
          console.log(results, 'SUCCESS IN GETGARDENPLANTS CONTROLLER');
          for(var i = results.length-1; i>= 0; i--){

            var nickname = results[i].nickname;
            // var plantDate =results[i].plantDate;
            // var plantStatus = results[i].plantStatus;
            nicknameArray.push(nickname);
            // plantDateArray.push(plantDate);
            // plantStatusArray.push(plantStatusArray);
          }
          $scope.nicknameArray = nicknameArray;
          // $scope.plantDateArray = plantDate;
          // $scope.plantStatusArray = plantStatus;
        })
        .catch(function(error) {
          console.log(error, 'ERROR INSIDE GETGARDENPLANTS');
        });
    }
    //adds the plant to the database
    $scope.addPlant = function(){
      if($scope.data.nickname){
        Plants.addPlant($scope.data)
          .then(function(results){
            console.log(results, 'SUCCESS IN ADDINPLANT ADDPLANT CONTROLLER');
            $scope.getGardenPlants();
            $scope.specificPlantInfoPrompts();
            $scope.userChoseGarden();
            $scope.userWantsToAddPlant();
            $scope.plantsInGardenTracker();
            $scope.data.botanicalName = '';
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
