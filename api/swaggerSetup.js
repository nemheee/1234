// swaggerSetup.js
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = require("./swaggerDefinition");

const swaggerSpec = swaggerJsdoc({
  swaggerOptions,
  apis: ["route.js"],
});

module.exports = swaggerSpec;
