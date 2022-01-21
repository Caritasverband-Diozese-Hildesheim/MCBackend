import swaggerAutogen from "swagger-autogen";
import configuration from "./configuration";

/** <p>Module for automated swagger-documentation</p>
* <p>generates ./swagger_output.json and monitored ["src/modules/routes.js", "src/modules/privateRoutes.js"]</p>
* <p>all other Configuration (title, definitions, etc) are here in the Javascript Object "doc"</p>
* @module modules/logger
*/
const outputFile = "./swagger_output.json";
const endpointsFiles = ["src/modules/routes.js", "src/modules/privateRoutes.js"];

const doc = {
  info: {
    version: "0.0.1",
    title: "\"Mein Caritas\" - Backend API",
    description: "This is the middleware for Mein Caritas.",
  },
  host: `${configuration.host}:${configuration.port}`,
  basePath: "/",
  schemes: [configuration.scheme],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      "name": "User",
      "description": "Endpoints",
    },
  ],

  securityDefinitions: {
    openId: {
      type: "openIdConnect",
      openIdConnectUrl: `${configuration.OIDCAuthUrl}/realms/${configuration.OIDCRealm}/.well-known/openid-configuration`,
    },
  },
};

swaggerAutogen({openapi: "3.0.1"})(outputFile, endpointsFiles, doc);
