const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions');

// get sessions based on ALL or by id
router.get('/', sessionsController.getAllSessions);
router.get('/:id', sessionsController.getSessionById);

// Week 3 - post, put, delete routes
// These routes communicate with controller/sessions to get code to create, update, and delte sessions
router.post('/', sessionsController.createSession);
router.put('/:id', sessionsController.updateSession);
router.delete('/:id', sessionsController.deleteSession);

module.exports = router;
