const { client } = require('../db/connection');
const { ObjectId } = require('mongodb');

/***************************** 
 Function to get all games
******************************/
const getAllGames = async (req, res) => {
  // Query the games collection in gameSessionDB and convert results to an array
  const game = await client.db('gameSessionDB').collection('games').find().toArray();
  res.json({ game });
};

/***************************** 
 Function to get game by id
******************************/
const getGameById = async (req, res) => {
  // get id from url
  const id = req.params.id;
  // checks if id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const session = await client
    .db('gameSessionDB')
    .collection('games')
    .findOne({ _id: new ObjectId(id) });

  if (!session) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(session);
};

/***************************** 
 Week 3 - POST/create game function
******************************/
const createGame = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.platform ||
    !req.body.genre ||
    !req.body.multiplayer ||
    !req.body.developer
  ) {
    return res.status(400).json({
      error: 'All fields are required: (title, platform, genre, multiplayer, developer)'
    });
  }

  // Creating newGame object
  const newGame = {
    title: req.body.title,
    platform: req.body.platform,
    genre: req.body.genre,
    multiplayer: req.body.multiplayer,
    developer: req.body.developer
  };

  // Inserting into database
  const result = await client.db('gameSessionDB').collection('games').insertOne(newGame);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json(result.error || 'Failed to create game.');
  }
};

/***************************** 
 Week 3 - PUT-update game function
******************************/
const updateGame = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.platform ||
    !req.body.genre ||
    !req.body.multiplayer ||
    !req.body.developer
  ) {
    return res.status(400).json({
      error: 'All fields are required: (title, platform, genre, multiplayer, developer)'
    });
  }

  //Gets the id from URL
  const userId = req.params.id;

  // Creating updatedGame object
  // express.json() basically translates JSON info into a JS object and stores it in req.body
  const updatedGame = {
    title: req.body.title,
    platform: req.body.platform,
    genre: req.body.genre,
    multiplayer: req.body.multiplayer,
    developer: req.body.developer
  };

  // Storing it into database
  const result = await client
    .db('gameSessionDB')
    .collection('games')
    .updateOne({ _id: new ObjectId(userId) }, { $set: updatedGame });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
};

/***************************** 
 Week 3 - DELETE Game function
******************************/
const deleteGame = async (req, res) => {
  // Getting userID from URL
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete session from database
  const result = await client
    .db('gameSessionDB')
    .collection('games')
    .deleteOne({ _id: new ObjectId(userId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
};

module.exports = { getAllGames, getGameById, createGame, updateGame, deleteGame };
