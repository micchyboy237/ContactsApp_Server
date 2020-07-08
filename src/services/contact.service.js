const httpStatus = require('http-status');
const { Contact } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a contact
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const createContact = async (contactBody) => {
  const contact = await Contact.create(contactBody);
  return contact;
};

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

module.exports = {
  createContact,
  getContacts,
};
