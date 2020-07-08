const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The contact's email
 * @param {ObjectId} [excludeContactId] - The id of the contact to be excluded
 * @returns {Promise<boolean>}
 */
contactSchema.statics.isEmailTaken = async function (email, excludeContactId) {
  const contact = await this.findOne({ email, _id: { $ne: excludeContactId } });
  return !!contact;
};

/**
 * Check if password matches the contact's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
contactSchema.methods.isPasswordMatch = async function (password) {
  const contact = this;
  return bcrypt.compare(password, contact.password);
};

contactSchema.pre('save', async function (next) {
  const contact = this;
  if (contact.isModified('password')) {
    contact.password = await bcrypt.hash(contact.password, 8);
  }
  next();
});

/**
 * @typedef Contact
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
