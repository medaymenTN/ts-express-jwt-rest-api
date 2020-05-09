import swaggerJsdoc from "swagger-jsdoc";
const options = {
  // List of files to be processed.
  apis: ["**/*.ts"],
  // You can also set globs for your apis
  // e.g. './routes/*.js'
  basePath: "/",
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      description: "Test API with autogenerated swagger doc",
      swagger: "2.0",
      title: "Product API",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  }
};
const specs = swaggerJsdoc(options);
export default specs;
