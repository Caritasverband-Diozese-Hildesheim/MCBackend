import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";
import logger from "./logger";
import setupAppforAuthentication from "./privateRoutes";
import promClient from "prom-client";

promClient.collectDefaultMetrics({
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
});

promClient.register.setDefaultLabels({
  app: 'mein-caritas-backend'
})

const httpRequests = new promClient.Counter({
  name: 'http_requests_get',
  help: 'Number of HTTP GET requests',
  labelNames: ['GET_requests'],
})

export default (app) => {
  app.use("/api-docs", (req, res, next) => {
    // #swagger.ignore = true
    next();
  }, swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "../../public")));
  app.get("/", (req, res) => {
    httpRequests.inc();
    res.render("index", {title: "Mein Caritas Backend Prototype"});
  });

  // error route
  app.use((err, req, res, next) =>{
    httpRequests.inc();
    logger.error(err.stack);
    res.status(500).send(err);
  });

  app.get("/error", (req, res, next) => {
    // #swagger.ignore = true
    next(error);
  });

  app.get("/metrics", (req, res) => {
    httpRequests.inc();
    promClient.register.metrics()
    .then ((str) =>{
      res.status(200).send(str);
    })
  })

  // 404 route
   app.get("*", async (req, res, next)=> {
    httpRequests.inc();
    // #swagger.ignore = true
    res.status(404).send("We couldn't find this page");
  })

  setupAppforAuthentication(app);
};
