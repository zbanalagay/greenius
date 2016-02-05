var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

if(!process.env.DEPLOYED) {
	var config = require('./../../env/config.js');
}

var mailer = require('./../../config/mailer.js');

module.exports = {

  addPlantEvent: function(req, res){
    // console.log(req.body, 'THIS IS REQ.BODY IN ADDPLANTEVENT HANDLER');
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

  getPlantEvent: function(req, res){
    // console.log(req.body, 'THIS IS REQ.BODY IN GETPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.getPlantEvents(plantEventData)
      .then(function(results){
        // console.log('SUCCESS INSIDE GETPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  getUserEvents: function(req, res){
    // console.log(req.body, 'THIS IS THE REQ.BODY IN GETUSEREVENT HANDLER');
    var userData = req.body;
    helper.getUserEvents(userData)
      .then(function(results){
        // console.log('SUCCESS INSIDE GETUSEREVENTS');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS HANDLER');
        res.status(404).send(error);
      });
  },

  postToGoogleCalendar: function(req, res){
     var recepient = req.body.email;
     mailer.plantMail(recepient);
     res.send(200).status('POSTED TO GOOGLE CALENDAR ');
 },

 removePlantEvent: function(req, res){
   console.log(req.body, 'THIS IS REQ.BODY IN REMOVEPLANTEVENT HANDLER');
   var plantEventData = req.body;
   helper.removePlantEvent(plantEventData)
     .then(function(results){
       console.log( results, 'SUCCESS INSIDE REMOVEPLANTEVENT HANDLER');
       res.status(200).send(results);
     })
     .catch(function(error){
       console.log(error, 'ERROR INSIDE REMOVEPLANTEVENT HANDLER');
       res.status(404).send(error);
     });
 },

 removeAllPlantEvents: function(req, res){
   console.log(req.body, 'THIS IS REQ.BODY IN REMOVEALLPLANTEVENTS HANDLER');
   var plantEventData = req.body;
   helper.removeAllPlantEvents(plantEventData)
    .then(function(results){
      console.log(results, 'SUCCESS INSIDE REMOVEALLPLANTEVENTS HANDLER');
      res.status(200).send(results);
    })
    .catch(function(error){
      console.log(error, 'ERROR INSIDE REMOVEALLPLANTEVENTS HANDLER');
      res.status(404).send(error);
    })
 }
};
