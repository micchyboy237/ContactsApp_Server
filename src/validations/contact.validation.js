const Joi = require('@hapi/joi');

const createContact = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    companyName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.number().required(),
  }),
};

module.exports = {
  createContact,
};
