const express = require('express');
const contactRoute = require('./contact.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/contacts', contactRoute);
router.use('/docs', docsRoute);

module.exports = router;
