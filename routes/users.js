const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');

/***************************** 
 Route to start GitHub login
******************************/
router.get('/github', passport.authenticate('github'));

/***************************** 
 Route to handle GitHub callback
******************************/
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  usersController.githubCallback
);

/***************************** 
 Route to logout
******************************/
router.get('/logout', usersController.logout);

module.exports = router;
