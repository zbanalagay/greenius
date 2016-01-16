var Sequelize = require('sequelize');

// establish a connection
var sequelize = new Sequelize('test', null, null,{
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

var models = {};

models.User = sequelize.define('User', {
  username: {
   type: Sequelize.STRING
 },
 password: {
   type: Sequelize.STRING
 },
 email: {
   type: Sequelize.STRING
 },
 location: {
   type: Sequelize.STRING
 }
 userPic: {
   type: Sequelize.STRING
 }
});

models.Plant = sequelize.define('Plant', {
  userId:{
    type: Sequelize.INTERGER
  },
  speciesId:{
    type: Sequelize.INTERGER
  },
  plantDate:{
    type: Sequelize.INTERGER
  },
  nickname: {
    type: Sequelize.STRING
  },
  plantStatus: {
    type: Sequelize.STRING
  },
  gardenId: {
    type: Sequelize.INTERGER
  }
});

models.SpeciesInfo = sequlize.define('SpeciesInfo', {
  speciesName: {
    type: Sequelize.STRING
  },
  plantPic: {
    type: Sequelize.STRING
  },
  wateringInformation: {
    type: Sequelize.STRING
  },
  germinationInformation: {
    type: Sequelize.STRING
  },
  locationInformation: {
    type: Sequelize.STRING
  }
});

models.Garden = sequlize.define('Garden', {
  gardenName: {
    type: Sequelize.STRING
  }
});

//establish the relationships between the tables
models.User.hasMany(models.Plant);
models.Garden.hasMany(models.Plant);
models.SpeciesInfo.hasMany(models.Plant);
models.User.belongsToMany(models.Garden, {through: 'Plant'});
models.Garden.belongsToMany(models.User, {through: 'Plant'});

// {force: true} will drop the table and re-create it
models.User.sync({force: false})
           .then(function() {
             console.log('User sync in sequelize.js');
           });

models.Plant.sync({force: false})
            .then(function() {
              console.log('Plant sync in sequelize.js');
            });

models.SpeciesInfo.sync({force: false})
            .then(function() {
              console.log('SpeciesInfo sync in sequelize.js');
            });

models.Garden.sync({force: false})
             .then(function() {
               console.log('Garden sync in sequelize.js');
             });

module.exports = models;
