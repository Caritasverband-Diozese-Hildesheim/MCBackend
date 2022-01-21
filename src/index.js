import app from "./modules/app";
import configuration from "./modules/configuration.js";
import logger from "./modules/logger";
import configScheme from "./model/configuration";

/** <p>our main Entrypoint for the backend</p>
* <p>it tests if the environment variables are set correctly</p>
* <p>if not it exits with an error (1)</p>
* @see [configuration]{@link module:modules/configuration}
* @module index
*/

/**
 *  It checks the conguration Object against its datamodel-scheme.
 *  If it fails, it lists all error and exit with code 1
 */
if (!configScheme.isValidSync(configuration)) {
  configScheme.validate(configuration, {abortEarly: false}).catch((err) => {
    logger.log({
      level: "error",
      message: `App Configuration failure:\r\n${err.errors.join("\r\n")} \r\n\r\nPassed configuration: ${JSON.stringify(configuration)} Exiting.\r\n`,
    });
    process.exit(1);
  });
}

/**
 * starts the app and logs the event on the console
 */
app.listen(configuration.port, configuration.host, () => {
  logger.info(`App starting on ${configuration.host}:${configuration.port}`);
});
