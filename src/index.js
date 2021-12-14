import app from './modules/app';
import configuration  from './modules/configuration.js';
import logger from './modules/logger'

logger.info("App starting on " + configuration.host + ":" + configuration.port);

app.listen(configuration.port, configuration.host);