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
        url: `http://localhost:8000/api`,
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
  apis: [
    "./routes/user/login.js",
    "./routes/user/modify.js",
    "./routes/mission/register.js",
    "./routes/mission/update.js",
    "./routes/mission/list.js",
    "./routes/mission/detail.js",
    "./routes/certification/register.js",
    "./routes/certification/list.js",
    "./routes/certification/report.js",
    "./routes/certification/removeReport.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
