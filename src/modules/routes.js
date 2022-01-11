import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";
import setupAppforAuthentication from "./privateRoutes";
import setupPromclient from "./middleware/promClient";


export default (app) => {
  setupAppforAuthentication(app);


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

  app.get("/error", (req, res, next) => {
    // #swagger.ignore = true
    next(error);
  });

  app.get("/metrics", setupPromclient.register);
  // 404 route

  app.get("*", (req, res, next)=> {
    // #swagger.ignore = true
    res.status(404).send("We couldn't find this page");
  });
};
