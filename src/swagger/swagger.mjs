import swaggerAutogen from "swagger-autogen";
import configuration from "./configuration.mjs";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["src/modules/routes.js"];

const doc = {
  info: {
    version: "0.0.1",
    title: "\"Mein Caritas\" - Backend API",
    description: "This is the middleware for Mein Caritas.",
  },
  host: configuration.host + ":" + configuration.port,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      "name": "User",
      "description": "Endpoints",
    },
  ],
  definitions: {
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        father: "Simon Doe",
        mother: "Marie Doe",
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company",
          },
        },
      ],
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: "",
    },
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
