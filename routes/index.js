const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/sessions', require('./sessions'));
router.use('/games', require('./games'));
router.use('/users', require('./users'));

module.exports = router;
