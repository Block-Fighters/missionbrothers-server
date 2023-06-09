const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Block Fighters Swagger",
    },
    servers: [
      {
        url: `http://localhost:8000`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/user/login.js", "./routes/mission/register.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
