import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";
import logger from "./logger";
import setupAppforAuthentication from "./privateRoutes";
import confluenceSite from "./externalAPIs/confluenceSite";


export default (app) => {
  app.use("/api-docs", (req, res, next) => {
    // #swagger.ignore = true
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "../../public")));
  app.get("/", (req, res) => {
    res.render("index", {title: "Mein Caritas Backend Prototype"});
  });

  // error route
  app.use((err, req, res, next) =>{
    logger.error(err.stack);
    res.status(500).send(err);
  });

  app.get("/error", (req, res, next) => {
    // #swagger.ignore = true
    next(error);
  });
  // 404 route
  /*  app.get("*", (req, res)=> {
    // #swagger.ignore = true
    res.status(404).send("We couldn't find this page");
  });*/
  /*  app.get("/createSite", (req, res, next) => {
    confluenceSite.createSite()
        .then((result) =>{
          res.status(200).send(result.data.userNotification);
        });
  });

  app.get("/updateSite/:id", (req, res, next) => {
    confluenceSite.updateSite({id: req.params.id})
        .then((result) =>{
          res.status(200).send(result.data.userNotification);
        });
  });
  app.get("/deleteSite/:id", (req, res, next) => {
    confluenceSite.deleteSite({id: req.params.id})
        .then((result) =>{
          res.status(200).send(result.data.userNotification);
        });
  });
*/
  app.get("/flex", (req, res, next) => {
    confluenceSite.readSite()
        .then((result) =>{
          res.render("apiView", {data: result.data.userNotification, title: "apiView - Test"});
        });
  });
  app.get("/flex/plain", (req, res, next) => {
    confluenceSite.readSite()
        .then((result) =>{
          res.status(result.statusCode).send(result.data.apiPayload);
        });
  });
  setupAppforAuthentication(app);
};
