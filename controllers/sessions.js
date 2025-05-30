const { client } = require('../db/connection');
const { ObjectId } = require('mongodb');

/***************************** 
 Function to get all sessions
******************************/
const getAllSessions = async (req, res) => {
  // Query the sessions collection in gameSessionDB and convert results to an array
  const session = await client.db('gameSessionDB').collection('sessions').find().toArray();
  res.json({ session });
};

/***************************** 
 Function to get session by id
******************************/
const getSessionById = async (req, res) => {
  // get id from url
  const id = req.params.id;
  // checks if id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const session = await client
    .db('gameSessionDB')
    .collection('sessions')
    .findOne({ _id: new ObjectId(id) });

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json(session);
};

/***************************** 
 Week 3 - POST/create session function
******************************/
const createSession = async (req, res) => {
  // if (
  //   !req.body.userId ||
  //   !req.body.gameId ||
  //   !req.body.date ||
  //   !req.body.startTime ||
  //   !req.body.duration ||
  //   !req.body.players ||
  //   !req.body.mode ||
  //   !req.body.platform ||
  //   !req.body.notes ||
  //   !req.body.status
  // ) {
  //   return res.status(400).json({
  //     error:
  //       'All fields are required: (userId, gameId, date, startTime, duration, players, mode, platform, notes)'
  //   });
  // }

  // Creating newSession object
  const newSession = {
    userId: req.body.userId,
    gameId: req.body.gameId,
    date: req.body.date,
    startTime: req.body.startTime,
    duration: req.body.duration,
    players: req.body.players,
    mode: req.body.mode,
    platform: req.body.platform,
    notes: req.body.notes,
    status: req.body.status
  };

  // Inserting into database
  const result = await client.db('gameSessionDB').collection('sessions').insertOne(newSession);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json(result.error || 'Failed to create session.');
  }
};

/***************************** 
 Week 3 - PUT-update session function
******************************/
const updateSession = async (req, res) => {
  // if (
  //   !req.body.userId ||
  //   !req.body.gameId ||
  //   !req.body.date ||
  //   !req.body.startTime ||
  //   !req.body.duration ||
  //   !req.body.players ||
  //   !req.body.mode ||
  //   !req.body.platform ||
  //   !req.body.notes ||
  //   !req.body.status
  // ) {
  //   return res.status(400).json({
  //     error:
  //       'All fields are required: (userId, gameId, date, startTime, duration, players, mode, platform, notes, status)'
  //   });
  // }

  //Gets the id from URL
  const userId = req.params.id;

  // Creating updatedSession object
  // express.json() basically translates JSON info into a JS object and stores it in req.body
  const updatedSession = {
    userId: req.body.userId,
    gameId: req.body.gameId,
    date: req.body.date,
    startTime: req.body.startTime,
    duration: req.body.duration,
    players: req.body.players,
    mode: req.body.mode,
    platform: req.body.platform,
    notes: req.body.notes,
    status: req.body.status
  };

  // Storing it into database
  const result = await client
    .db('gameSessionDB')
    .collection('sessions')
    .updateOne({ _id: new ObjectId(userId) }, { $set: updatedSession });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
};

/***************************** 
 Week 3 - DELETE Session function
******************************/
const deleteSession = async (req, res) => {
  // Getting userID from URL
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete session from database
  const result = await client
    .db('gameSessionDB')
    .collection('sessions')
    .deleteOne({ _id: new ObjectId(userId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
};

module.exports = { getAllSessions, getSessionById, createSession, updateSession, deleteSession };
