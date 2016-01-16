var Sequelize = require('sequelize');

// establish a connection
var sequelize = new Sequelize('test', null, null,{
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

var models = {};

models.Users = sequelize.define('Users', {
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

models.Plants = sequelize.define('Plants', {
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

models.speciesInfo = sequlize.define('SpeciesInfo', {
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

models.garden = sequlize.define('Garden', {
  gardenName: {
    type: Sequelize.STRING
  }
});
