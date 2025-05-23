const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');

// get games based on ALL or by id
router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);

// Week 3 - post, put, delete routes
// These routes communicate with controller/games to get code to create, update, and delte games
router.post('/', gamesController.createGame);
router.put('/:id', gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame);

module.exports = router;
