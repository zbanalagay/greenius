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
