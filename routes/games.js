const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');
const { gameValidation } = require('../validators/gamesValidator');
const { verifyToken } = require('../validators/usersValidator');

// get games based on ALL or by id
router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);

// Week 3 - post, put, delete routes
// These routes communicate with controller/games to get code to create, update, and delte games
router.post('/', verifyToken, gameValidation, gamesController.createGame);
router.put('/:id', verifyToken, gameValidation, gamesController.updateGame);
router.delete('/:id', verifyToken, gamesController.deleteGame);

module.exports = router;
