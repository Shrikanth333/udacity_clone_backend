const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

const url = 'mongodb+srv://udacity-thor:avengers$23@udacity-thor-ltuh0.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = client;
