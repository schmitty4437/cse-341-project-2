const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// get contacts based on ALL or by id
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);

// Week 3 - post, put, delete routes
// These routes communicate with controller/contacts to get code to create, update, and delte contacts
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
