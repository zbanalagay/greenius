var db = require('./sequlize.js');

var helpers = {

  //user is an object with keys: username, password, email, location, userPic
  addUser : function(user) {
    return db.User.findOne({
      where: {username: user.username}
      })
      .then(function(userResult) {
         if(userResult){
           throw Error('Username is already taken');
         }
         return db.User.create(user);
      })
      .catch(function(error) {
         console.log('Error adding user to the database', error);
      })
  },

  addPlant : function(plant) {
    var plantObj = {};

    // Check for User ID
    return db.User.findOne({
      where: {username: user.username}
    })
    .then(function(userResults) {
      if(!userResults) {
        throw Error('Username does not exist');
      }
      console.log('User ID exists: ', userResults);
      plantObj.userResults = userResults; // TODO: Findout userId

        // Check for Species ID
        return db.SpeciesInfo.findOne({
          where: {speciesName: plant.commonName}
        })
        .then(function(speciesResults) {
          if(!speciesResults) {
            throw Error('Species does not exist');
          }
          console.log('Species exists: ', speciesResults);
          plantObj.speciesResults = speciesResults; // TODO: Findout speciesId

            // Check for Garden ID
            return db.Garden.findOne({
              where: {gardenName: plant.gardenName}
            })
            .then(function(gardenResults) {
              if(!gardenResults) {
                throw Error('Garden does not exist');
              }
              console.log('Garden exists: ', gardenResults);
              plantObj.gardenResults = gardenResults; // TODO: Findout gardenId

                // Insert plant into Plant table
                return db.Plant.create({
                  userId: plantObj.userResults,
                  speciesId: plantObj.speciesResults,
                  plantDate: plant.plantDate,
                  nickname: plant.nickname,
                  plantStatus: plant.plantStatus,
                  gardenId: plantObj.gardenResults
                })
                .then(function(plantResults) {
                  console.log('Add plant successful');
                })
                .catch(function(error) {
                   console.log('Error adding plant to the database', error);
                })
            })
        })
    })
  },

  addGarden : function(garden) {

  },

  addSpeciesInfo : function(species) {

  },

  addPlantToGarden : function(plant, garden) {

  },

  addUserToGarden : function(user, garden) {

  },

  getUser : function(user) {

  },

  getGarden : function(garden) {

  },

  getSpeciesInfo : function(species) {

  },

  getUserPlants : function(plant, user) {

  },

  getGardenPlants : function(garden, plant) {

  },

  getGardenUsers : function(garden, user) {
    
  }


};

module.exports = helpers;
