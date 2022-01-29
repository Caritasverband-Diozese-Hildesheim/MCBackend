import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";
import setupPromclient from "../modules/middleware/promClient";

/** <p>Module that defines all our public routes</p>
* <p>It exportsd just a function, that that the Express-App as input</p>
* our public routes are
* <ul>
*  <li><a href="/">/</a>: Welcome / Landing-Page</li>
*  <li><a href="/api-docs">/api-docs</a>: swagger-documentation of all our APIs</li>
*  <li><a href="/code-docs">/code-docs</a>: code-documentation. Yu are here.</li>
*  <li><a href="/metrics">/metrics</a>: exports measurements for our prometheus</li>
* </ul>
* @module modules/routes
*/


export default (app) => {
  app.use("/api-docs", (req, res, next) => {
    // #swagger.ignore = true
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "../../public")));


  app.get("/", (req, res) => {
    // #swagger.ignore = true
    res.render("index", {title: "Mein Caritas Backend Prototype"});
  });

  app.get("/ping", (req, res, next) => {
    res.status(200).send("{\"message\": \"pong\"}");
  });

  app.get("/metrics", (req, res, next) =>{
    // #swagger.ignore = true
    next();
  },
  setupPromclient.register);
};
