 var DocumentDBClient = require('documentdb').DocumentClient;
 //var async = require('async');

 function GameList(gameDao) {
   this.gameDao = gameDao;
   
 }
 
 
 GameList.prototype = {
	 
     showTasks: function (callback) {
         var self = this;
		 
		 console.log("showTasks");

         var querySpec = {
             //query: 'SELECT * FROM root r WHERE r.completed=@completed',
			 query: 'SELECT * FROM Sotic S where S.entityType = @entityType',
			 parameters: [{
                 name: '@entityType',
                 value: 'RU7_MatchStat'
             }]
         };
		 
		 
		 
		 var matchList = "";
         self.gameDao.find(querySpec, function (err, items) {
             if (err) {
                 //throw (err);
				 callback(err);
             }
	     
		 
		 matchList = items;		
		 return callback(matchList);		 
		
         });		
		 		 
     },
	 
	 getAutoPopulatedSquad: function (callback) {
         var self = this;
		 
		 console.log("getAutoPopulatedSquad");

         var querySpec = {
             //query: 'SELECT * FROM root r WHERE r.completed=@completed',
			 query: 'SELECT * FROM API_Squad S'
			 //, parameters: [{
              //   name: '@entityType',
              //   value: 'RU7_MatchStat'
             //}]
         };
		 
		 
		 
		 var matchList = "";
         self.gameDao.find(querySpec, function (err, items) {
             if (err) {
                 //throw (err);
				 callback(err);
             }
	     
		 
		 matchList = items;		
		 return callback(matchList);		 
		
         });		
		 		 
     },
	 
	 getExpertList: function (callback) {
         var self = this;
		 
		 console.log("getExpertList");

         var querySpec = {
             //query: 'SELECT * FROM root r WHERE r.completed=@completed',
			 query: 'SELECT * FROM API_Experts S'
			 //,
			 //parameters: [{
                // name: '@entityType',
                 //value: 'RU7_MatchStat'
             //}]
         };
		 
		 
		 
		 var matchList = "";
         self.gameDao.find(querySpec, function (err, items) {
             if (err) {
                 //throw (err);
				 callback(err);
             }
	     
		 
		 matchList = items;		
		 return callback(matchList);		 
		
         });		
		 		 
     },
	 
	 getMySquadRating: function (callback) {
         var self = this;
		 
		 console.log("getMySquadRating");

         var querySpec = {
             //query: 'SELECT * FROM root r WHERE r.completed=@completed',
			 query: 'SELECT * FROM API_SquadRating S'
			 //,
			 //parameters: [{
              //   name: '@entityType',
               //  value: 'RU7_MatchStat'
             //}]
         };
		 
		 
		 
		 var matchList = "";
         self.gameDao.find(querySpec, function (err, items) {
             if (err) {
                 //throw (err);
				 callback(err);
             }
	     
		 
		 matchList = items;		
		 return callback(matchList);		 
		
         });		
		 		 
     },
	 
	 getPlayersList: function (callback) {
         var self = this;
		 
		 console.log("getPlayersList");

         var querySpec = {
             //query: 'SELECT * FROM root r WHERE r.completed=@completed',
			 query: 'SELECT * FROM  API_Players S'
			 //,
			// parameters: [{
             //    name: '@entityType',
              //   value: 'RU7_MatchStat'
             //}]
         };
		 
		 
		 
		 var matchList = "";
         self.gameDao.find(querySpec, function (err, items) {
             if (err) {
                 //throw (err);
				 callback(err);
             }
	     
		 
		 matchList = items;		
		 return callback(matchList);		 
		
         });		
		 		 
     },
	 
	 getPlayersProfile: function (callback) {
         var self = this;
		 
		 console.log("getPlayersProfile");

         var querySpec = {
             //query: 'SELECT * FROM root r WHERE r.completed=@completed',
			 query: 'SELECT * FROM API_PlayersProfile S'
			 //,
			 //parameters: [{
             //    name: '@entityType',
              //   value: 'RU7_MatchStat'
             //}]
         };
		 
		 
		 
		 var matchList = "";
         self.gameDao.find(querySpec, function (err, items) {
             if (err) {
                 //throw (err);
				 callback(err);
             }
	     
		 
		 matchList = items;		
		 return callback(matchList);		 
		
         });		
		 		 
     }

    
 };

 module.exports = GameList;