const express = require('express');
const validate = require('../../middlewares/validate');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(contactValidation.createContact), contactController.createContact)
  .get(contactController.getContacts);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management and retrieval
 */

/**
 * @swagger
 * path:
 *  /contacts:
 *    post:
 *      summary: Create a contact
 *      tags: [Contacts]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - firstName
 *                - lastName
 *                - companyName
 *                - email
 *                - phoneNumber
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                companyName:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                phoneNumber:
 *                   type: number
 *              example:
 *                firstName: Jethro
 *                lastName: Estrada
 *                companyName: Amazon
 *                email: jethroestrada237@gmail.com
 *                phoneNumber: 639159897270
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Contact'
 *
 *    get:
 *      summary: Get all contacts
 *      tags: [Contacts]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Contact'
 */
