"use strict"; 
var express = require('express');
var router = express.Router();
var jsSHA = require("jssha");
var jsonpack = require('jsonpack/main');

var DocumentDBClient = require('documentdb').DocumentClient;

var config = require('../config');
var GameList = require('../routes/gamelist');
var GameDao = require('../routes/gameDao');


var docDbClient = new DocumentDBClient(config.host, {
     masterKey: config.authKey
 });
 
 
var gameDao = new GameDao(docDbClient, config.databaseId, config.collectionId);
var gameList = new GameList(gameDao);
gameDao.init(function(err) { if(err) throw err; });

var squadDao = new GameDao(docDbClient, config.apidatabaseId, config.squadCollecId);
var squadList = new GameList(squadDao);
squadDao.init(function(err) { if(err) throw err; });

var expertsDao = new GameDao(docDbClient, config.apidatabaseId, config.expertsCollecId);
var expertsList = new GameList(expertsDao);
expertsDao.init(function(err) { if(err) throw err; });


var squadRatingDao = new GameDao(docDbClient, config.apidatabaseId, config.squadRatingCollecId);
var squadRatingList = new GameList(squadRatingDao);
squadRatingDao.init(function(err) { if(err) throw err; });

var playersDao = new GameDao(docDbClient, config.apidatabaseId, config.playersCollecId);
var playersList = new GameList(playersDao);
playersDao.init(function(err) { if(err) throw err; });

var playerProfileDao = new GameDao(docDbClient, config.apidatabaseId, config.playerProfileCollecId);
var playerProfileList = new GameList(playerProfileDao);
playerProfileDao.init(function(err) { if(err) throw err; });
 

router.get('/getdocumentspacked', function (req, res) {
    
	console.log("getdocumentspacked");
	gameList.showTasks(function(items){ 
	
	 var itemspacked = jsonpack.pack(items);  
	 res.json(itemspacked); 
	 
	});
})

router.get('/getAutoPopulatedSquad', function (req, res) {
	
    
	console.log("getAutoPopulatedSquad");
	squadList.getAutoPopulatedSquad(function(items){ 
	  
	 res.json(items); 
	});
	
})

router.get('/getExpertList', function (req, res) {
   
    
	console.log("getdocument");
	expertsList.getExpertList(function(items){ 		  
	 res.json(items); 
	});
})


router.get('/getMySquadRating', function (req, res) {
    
	console.log("getdocumentspacked");
	squadRatingList.getMySquadRating(function(items){ 	

	 res.json(items); 
	});
})

router.get('/getPlayersList', function (req, res) {
   
	console.log("getdocumentspacked");
	playersList.getPlayersList(function(items){ 	
	 
	 res.json(items); 
	});
})


router.get('/getPlayersProfile', function (req, res) {
    
	console.log("getdocumentspacked");
	playerProfileList.getPlayersProfile(function(items){ 	
	 res.json(items); 
	});
})




/* Hash function from client */
function hash(pwd) {
  var shaObj = new jsSHA("SHA-256", "TEXT");
  var coeff = 1000 * 5;
  var date = Date.now();  //or use any other date
  var rounded = Math.round(date / coeff) * coeff;
  shaObj.update(pwd + rounded);
  var hash = shaObj.getHash("HEX");
  return hash;
}


module.exports = router;
