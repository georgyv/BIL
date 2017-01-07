var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('../routes/docdbUtils');

 function GameDao(documentDBClient, databaseId, collectionId) {
   this.client = documentDBClient;
   this.databaseId = databaseId;
   this.collectionId = collectionId;

   this.database = null;
   this.collection = null;
 }
 
 
 
 GameDao.prototype = {
     init: function (callback) {
         var self = this;

         docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
             if (err) {
                 callback(err);
             } else {
                 self.database = db;
                 docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                     if (err) {
                         callback(err);

                     } else {
                         self.collection = coll;
                     }
                 });
             }
         });
     },

     find: function (querySpec, callback) {
         var self = this;
		  console.log('self-----'+self);
         self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
             if (err) {
                 callback(err);

             } else {
                 callback(null, results);
             }
         });
     },

     
     getItem: function (itemId, callback) {
         var self = this;

         var querySpec = {
             query: 'SELECT * FROM root r WHERE r.id = @id',
             parameters: [{
                 name: '@id',
                 value: itemId
             }]
         };

         self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
             if (err) {
                 callback(err);

             } else {
                 callback(null, results[0]);
             }
         });
     }
 };

 module.exports = GameDao;
 
 
 