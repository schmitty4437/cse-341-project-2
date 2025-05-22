const express = require('express');
const router = express.Router();
//const nameController = require('../controllers');

//router.get('/', nameController.getName);

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

module.exports = router;
