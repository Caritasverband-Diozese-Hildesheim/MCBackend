import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";
import setupAppforAuthentication from "./privateRoutes";
import setupPromclient from "./middleware/promClient";


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

  app.get("/metrics", (req, res, next) =>{
    // #swagger.ignore = true
    next();
  },
  setupPromclient.register);

  setupAppforAuthentication(app);
};
