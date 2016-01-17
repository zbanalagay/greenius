var db = require('./sequelize.js');

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
                  idOfUser: plantObj.userResults,
                  idOfSpecies: plantObj.speciesResults,
                  plantDate: plant.plantDate,
                  nickname: plant.nickname,
                  plantStatus: plant.plantStatus,
                  idOfGarden: plantObj.gardenResults
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

  //garden is an object with gardenName
  addGarden : function(garden) {
    return db.Garden.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(gardenResult){
        throw Error('Garden name is already taken');
      }
      return db.Garden.create(garden);
    })
    .catch(function(error) {
      console.log('Error adding garden to database', error);
    })
  },

  //species is an object with commonName,botanicalName, plantLink, plantPic, wateringInformation, germinationInformation, locationInformation
  addSpeciesInfo : function(species) {
    return db.SpeciesInfo.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(speciesResult) {
      if(speciesResult){
        throw Error('Species info is already in database');
      }
      return db.SpeciesInfo.create({
        commonName: species.commonName,
        botanicalName: species.botanicalName,
        plantPic: species.plantPic,
        plantLink: species.plantLink,
        wateringInformation: species.wateringInformation,
        typeOf: species.typeOf,
        exposure: species.exposure,
        generalInformation: species.generalInformation,
        plantingGuide: species.plantingGuide,
        pestsDiseases: species.pestsDiseases,
        careGuide: species.careGuide
      })
    })
    .then(function(speciesResult) {
      console.log('add species successful');
    })
    .catch(function(error) {
      console.log('Error adding species to database', error);
    })
  },

  addPlantToGarden : function(plant, garden) {
    var plantObj = {};
    return db.Garden.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(gardenResult) {
        throw ERROR('Garden name does not exist');
      }
      console.log('Garden name exists: ', gardenResult.gardenName);
      plantObj.gardenId = gardenResult.Id;

      return db.Plant.findOne({ // TODO: Make sure to pass in plantId
        where: {plantId: plant.plantId}
      })
      .then(function(plantResult) {
        if(plantResult) {
          throw ERROR('Plant ID does not exist');
        }
        console.log('Plant name exists: ', plantResult);
          return db.Plant.set({
            gardenId: plantObj.Id
          })
        })
        .then(function(addPlantToGardenResult) {
          console.log('Add plant to garden successful');
        })
        .catch(function(error) {
           console.log('Error adding plant to the database', error);
        })
    })
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
