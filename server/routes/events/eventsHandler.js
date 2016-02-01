var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');
var mailer = require('./../../config/mailer.js');

module.exports = {

  addPlantEvent: function(req, res){
    console.log(req.body, 'THIS IS REQ.BODY IN ADDPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.addPlantEvent(plantEventData)
      .then(function(results){
        console.log('SUCCESS INSIDE ADDPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE ADDPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  removePlantEvent: function(req, res){
    console.log(req.body, 'THIS IS REQ.BODY IN REMOVEPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.removePlantEvent(plantEventData)
      .then(function(results){
        console.log('SUCCESS INSIDE REMOVEPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE REMOVEPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  getPlantEvent: function(req, res){
    console.log(req.body, 'THIS IS REQ.BODY IN GETPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.getPlantEvent(plantEventData)
      .then(function(results){
        console.log('SUCCESS INSIDE GETPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },
  
  getUserEvents: function(req, res){
    console.log(req.body, 'THIS IS THE REQ.BODY IN GETUSEREVENT HANDLER');
    var userData = req.body;
    helper.getUserEvents(userData)
      .then(function(results){
        console.log('SUCCESS INSIDE GETUSEREVENTS');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS HANDLER');
        res.status(404).send(error);
      });
  }
};
