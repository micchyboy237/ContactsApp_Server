const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Macanta API Documentation',
    version,
  },
  servers: [
    {
      url: `${config.host}:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
