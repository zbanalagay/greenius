var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

module.exports = {
	 addPlant: function(req, res) {
		 console.log(req.body, 'THIS IS THE REQ.BODY INSIDE ADDPLANT');
		 var plantData = req.body;
		 helper.addPlant(plantData)
       .then(function(results) {
         //need to call addSpeciesInfo?
					console.log('SUCCESS IN ADDPLANT HANDLER');
					res.status(200).send(results);
				})
				.catch(function(error) {
					console.log(error, 'ERROR INSIDE ADDPLANT HANDLER');
					res.status(404).send(error);
				})
	 },

	 getPlantsForAUser: function(req, res) {
		 console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETPLANTSFORAUSER');
		 var userData = req.body //TODO: find the user object on the req.body
		 var plantData = req.body //TODO: find the plant object on the req.body
		 helper.getUserPlants(plantData, userData)
		   .then(function(results) {
					console.log('SUCCESS IN GETPLANTSFORAUSER HANDLER');
					res.status(200).send(results);
				})
				.catch(function(error) {
					console.log(error, 'ERROR INSIDE GETPLANTSFORAUSER HANDLER');
					res.status(404).send(error);
				})
	 },

   getSpecieInfo: function(req, res) {
     console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETSPECIEINFO');
     var specieData = req.body;
    //  TODO fix the database helperfunction- results needs to return the information not be empty
     helper.getSpeciesInfo(specieData)
       .then(function(results) {
         console.log(results, "THIS IS RESULTS GETSPECIE HANDLER")
         console.log('SUCCESS IN GETSPECIEINFO HANDLER');
         res.status(200).send(results);
       })
       .catch(function(error) {
         console.log(error, 'ERROR ISNIDE GETSPECIEINFO HANDLER');
         res.status(404).send(error);
       })
   },

   getPlant: function(req, res){
     console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETPLANTHABDKER');
     var plantData = req.body;
     helper.getPlant(plantData)
       .then(function(results) {
         console.log(results, 'SUCCESS IN GETPLANT HANDLER');
         res.status(200).send(results);
       })
       .catch(function(error) {
         console.log(error, 'ERROR INSIDE GETPLANT HANDLER');
         res.status(404).send(error);
       })
    }
}
