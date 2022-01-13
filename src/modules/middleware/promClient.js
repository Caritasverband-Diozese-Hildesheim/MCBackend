import promClient from "prom-client";

promClient.collectDefaultMetrics({
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
});

promClient.register.setDefaultLabels({
  app: "mein-caritas-backend",
});

const httpRequests = new promClient.Counter({
  name: "http_requests_counts",
  help: "Number of HTTP requests",
  labelNames: ["requests"],
});

const countRequests = new promClient.Counter({
  name: 'http_resource_counts',
  help: 'Count specific calls',
  labelNames: ['resource'],
});

export default {
  register: (req, res, next) => {
    promClient.register.metrics()
        .then((str) => {
          res.status(200).send(str);
        });
  },
  thisOneCounts: (req, res, next) => {
    if (!["/metrics", "/favicon.ico"].includes(req.url) ) { 
      httpRequests.inc();
      countRequests.labels(req.url).inc();
    }

    next();
  },
};
