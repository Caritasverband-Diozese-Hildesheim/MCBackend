import app from "./modules/app";
import configuration from "./modules/configuration.js";
import logger from "./modules/logger";
import configScheme from "./model/configuration";

if (!configScheme.isValidSync(configuration)) {
  configScheme.validate(configuration, {abortEarly: false}).catch((err) => {
    logger.log({
      level: "error",
      message: `App Configuration failure:\r\n${err.errors.join('\r\n')} \r\n\r\nPassed configuration: ${JSON.stringify(configuration)} Exiting.\r\n`,
    });
    process.exit(1);
  });
}
app.listen(configuration.port, configuration.host, () => {
  logger.info(`App starting on ${configuration.host}:${configuration.port}`);
});
