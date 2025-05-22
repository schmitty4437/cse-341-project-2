const { client } = require('../db/connection');
const { ObjectId } = require('mongodb');

/***************************** 
 Function to get all contacts
******************************/
const getAllContacts = async (req, res) => {
  // Query the contacts collection in contactsDB and convert results to an array
  const contacts = await client.db('contactsDB').collection('contacts').find().toArray();
  res.json({ contacts });
};

/***************************** 
 Function to get contact by id
******************************/
const getContactById = async (req, res) => {
  // get id from url
  const id = req.params.id;
  // checks if id is valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const contact = await client
    .db('contactsDB')
    .collection('contacts')
    .findOne({ _id: new ObjectId(id) });

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.json(contact);
};

/***************************** 
 Week 3 - POST/create contact function
******************************/
const createContact = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.favoriteColor ||
    !req.body.birthday
  ) {
    return res.status(400).json({
      error: 'All fields are required: (firstName, lastName, email, favoriteColor, birthday)'
    });
  }

  // Creating newContact object
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  // Inserting into database
  const result = await client.db('contactsDB').collection('contacts').insertOne(newContact);
  if (result.acknowledged) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json(result.error || 'Failed to create contact.');
  }
};

/***************************** 
 Week 3 - PUT-update contact function
******************************/
const updateContact = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.favoriteColor ||
    !req.body.birthday
  ) {
    return res.status(400).json({
      error: 'All fields are required: (firstName, lastName, email, favoriteColor, birthday)'
    });
  }

  //Gets the id from URL
  const userId = req.params.id;

  // Creating updatedContact object
  // express.json() basically translates JSON info into a JS object and stores it in req.body
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  // Storing it into database
  const result = await client
    .db('contactsDB')
    .collection('contacts')
    .updateOne({ _id: new ObjectId(userId) }, { $set: updatedContact });
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
};

/***************************** 
 Week 3 - DELETE contact function
******************************/
const deleteContact = async (req, res) => {
  // Getting userID from URL
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Delete contact from database
  const result = await client
    .db('contactsDB')
    .collection('contacts')
    .deleteOne({ _id: new ObjectId(userId) });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };
