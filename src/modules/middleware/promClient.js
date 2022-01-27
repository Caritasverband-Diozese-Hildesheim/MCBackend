import promClient from "prom-client";

/**
* Module that dsfines metrics for prometheus (always under URL-Path '/metrics')
* Exports Object with a register-function used as a express-middleware-function
* @module modules/middleware/promClient
**/

// We declare the export of the default metrics 
promClient.collectDefaultMetrics({
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
});

// Labels are used in prometheus to group ans define the legend. So we wamt to find our own app 
promClient.register.setDefaultLabels({
  app: "mein-caritas-backend",
});

// Declaring and Iinitializing of a new counter. This one will be used to count all requests.
const httpRequests = new promClient.Counter({
  name: "http_requests_counts",
  help: "Number of HTTP requests",
  labelNames: ["requests"],
});

// Declaring and Iinitializing of a new counter. This one will be used to count how often a specific IP sends a requests.
const httpRequestsIps = new promClient.Counter({
  name: "http_requests_ips",
  help: "Count client IPs",
  labelNames: ["IP"],
});

// Declaring and Iinitializing of a new counter. This one will be used to count how often a specific URL is requested
const countRequests = new promClient.Counter({
  name: "http_resource_counts",
  help: "Count specific calls",
  labelNames: ["resource"],
});

export default {
  // just to tell the client what to send to the browser. First, colloect all metrics (is a [promise]{@link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise}) if its resolved, we send all metrics plain as a string
  register: (req, res, next) => {
    promClient.register.metrics()
        .then((str) => {
          res.status(200).send(str);
        });
  },
  // this function is used to actually counting. We always ignore /metrics /favicon.ico and tthe app itself.
  thisOneCounts: (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        null;
    if ((!["/metrics", "/favicon.ico"].includes(req.url)) && (ip !== "127.0.0.1")) {
      httpRequests.inc();
      countRequests.labels(req.url).inc();
      httpRequestsIps.labels(ip).inc();
    }
    next();
  },
};
