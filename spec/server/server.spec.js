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
      username: 'Bob'
};

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
});








