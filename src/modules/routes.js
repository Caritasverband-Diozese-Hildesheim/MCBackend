import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";
import logger from "./logger";
import VPERoutes from '../routes/VPERoutes'

export default (app) => {
  app.use("/code-docs", express.static(path.join(__dirname, "../../docs")));
  app.use("/api-docs", (req, res, next) => {
    // #swagger.ignore = true
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.use('/VPE', VPERoutes);
  
  // error route
  app.use((err, req, res, next) =>{
    logger.error(err.stack);
    res.status(500).send(err);
  });

  app.get("/error", (req, res, next) => {
    next(error);
  });
  // 404 route
  app.get("*", (req, res)=> {
    // #swagger.ignore = true
    res.status(404).send("We couldn't find this page");
  });
};
