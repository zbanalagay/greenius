var helpers = require('../../server/db/helpers.js');
var sequelize = require('sequelize');

// run test in command line wit: $jasmine
var dbConnection;
beforeAll(function() {
  //create our database
  dbConnection = new sequelize('testingDB', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './testdb.sqlite'
  });
});

afterAll(function() {
   dbConnection.close();
});

// mock user data
var user = {
      username: 'Bob',
      email: 'whiprides@gmail.com'
};

var plant = {
  username: 'Bob',
  commonName: 'Peaches',
  nickname: 'Lil Peachy',
  plantStatus: 'Nursery'
}

var plantDelete = {
  plantDelete : 'Lil Peachy'
}
describe('addUser()', function() {

  it('addUser should be a function', function() {
    expect(helpers.addUser).toEqual(jasmine.any(Function));
  })

  it('addUser should add a user to the database', function(done) {
    helpers
      .addUser(user)
      .then(function(userResult) {
        expect(userResult.username).toBe('Bob');
        done();
      });
  });

});

describe('getUser()', function() {
  it('getUser should be a function', function() {
    expect(helpers.addUser).toEqual(jasmine.any(Function));
  })

  it('getUser should get a user from the database', function(done) {
    helpers
      .getUser(user)
      .then(function(userResult) {
        expect(userResult.username).toBe('Bob');
        done();
      });
  });

  describe('deleteUser()', function() {

    it('deleteUser should be a function', function() {
      expect(helpers.deleteUser).toEqual(jasmine.any(Function));
    })

    it('deleteUser should delete a user from the database', function(done) {
      helpers
        .deleteUser(user)
        .then(function(userResult) {
          expect(userResult).toBe(1);
          done();
        });
    });
  });

  describe('addPlant()', function() {
    it('addPlant should be a function', function() {
      expect(helpers.addPlant).toEqual(jasmine.any(Function));
    });

    it('addPlant should add a plant from the database', function(done) {
      helpers
        .addUser(user)
        .then(function(userResult) {
          helpers
            .addPlant(plant)
            .then(function(plantResult) {
              expect(plantResult.nickname).toBe('Lil Peachy');
              done();
            });
        });
    });
  });

  describe('getPlantByNickname()', function() {
    it('getPlantByNickname should be a function', function() {
      expect(helpers.getPlantByNickname).toEqual(jasmine.any(Function));
    });

    it('getPlantByNickname should get a Plant by nickname from the database', function(done) {
        helpers
          .getPlantByNickname(plant)
          .then(function(plantResult) {
            expect(plantResult.nickname).toBe('Lil Peachy');
            done();
          });
    });
  })
  describe('deletePlant()', function() {
    it('deletePlant should be a function', function() {
      expect(helpers.deletePlant).toEqual(jasmine.any(Function));
    });

    it('deletePlant should delete a plant from the database', function(done) {
      helpers
        .deletePlant(plantDelete)
        .then(function(plantResult) {
          expect(plantResult).toBe(1);
          helpers
            .deleteUser(user)
            .then(function(userResult){
              done();
            });
        });
    });
  });



});
