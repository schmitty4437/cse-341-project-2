const { MongoClient } = require('mongodb');

//get variable from .env file
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// store db connection
let dbConnection;

//function to connect to db
const connectDb = async () => {
  if (dbConnection) {
    console.log('Using existing MongoDB connection');
    return dbConnection;
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    dbConnection = client.db('contactsDB');
    return dbConnection;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
};

module.exports = { connectDb, client };
