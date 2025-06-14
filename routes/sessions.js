const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions');
const { sessionValidation } = require('../validators/sessionsValidator');
const { verifyToken } = require('../validators/usersValidator');

// get sessions based on ALL or by id
router.get('/', sessionsController.getAllSessions);
router.get('/:id', sessionsController.getSessionById);

// Week 3 - post, put, delete routes
// These routes communicate with controller/sessions to get code to create, update, and delte sessions
router.post('/', verifyToken, sessionValidation, sessionsController.createSession);
router.put('/:id', verifyToken, sessionValidation, sessionsController.updateSession);
router.delete('/:id', verifyToken, sessionsController.deleteSession);

module.exports = router;
