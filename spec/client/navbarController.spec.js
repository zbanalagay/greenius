"use strict";

// run test in command line wit: $gulp tdd
describe('navbarController', function () {
  var nvp;
  var auth;
  var store;
  var Plants;
  var $location;
  var $httpBackend;
  var createController;
  var $controller;

  beforeEach(module('greeniusApp'));
  beforeEach(inject(function($injector) {

    $httpBackend = $injector.get('$httpBackend');
    auth = $injector.get('auth');
    store = $injector.get('store');
    Plants = $injector.get('Plants');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');

    $controller = $injector.get('$controller');

    createController = function () {
      return $controller('LinksController', {
        nvp: nvp,
        auth: auth,
        store: store,
        Plants: Plants,
        $location: $location 
      });
    };
  }));

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });


});  
