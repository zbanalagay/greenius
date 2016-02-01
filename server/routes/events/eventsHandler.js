var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
//TODO: make process.env variables fro CLIENT_SECRET
var oauth2Client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,"http://127.0.0.1:3000/auth/google/callback");
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
  },

  postToGoogleCalendar: function(req, res){
    console.log(req.user, 'THIS IS THE REQ.USER IN POSTTOGOOGLECALENDAR HANDLER');
    //TODO MAKE SURE THIS IS RIGHT
    oauth2Client.setCredentials({
     access_token: req.user.accessToken,
     refresh_token: req.user.refreshToken
   });

   console.log(req.body, 'THIS IS THE REQ.BODY IN POSTTOGOOGLECALENDAR HANDLER');
   //TODO GET WHAT YOU NEED FROM THE REQ.BODY;
   var description = req.body  //TODO GET WHAT YOU NEED FROM THE REQ.BODY;

   var event = {
     'summary' : description,
     'description' : description,
     'start' : {
       'dateTime': req.body.plantDate
     },
     'end' : {
       'dateTime': req.body.endDate //have some logic that this is three months after plantDate;
     }
   }
   var calendar = google.calendar('v3');

   calendar.events.insert({
     auth: oauth2Client,
     calendarId: 'primary',
     resource: event,
   }, function(err, event){
     if(err){
       console.log('Oh no! There was an error contacting the calendar service: ', error);
       return;
     }

    //TODO MAKE SURE THIS IS RIGHT
     var email = req.user.profile.emails[0].value;
     mailer.sendMail(email, event.htmlLink);
     res.send(200).status(event.htmlLink);

   })
  }
};
