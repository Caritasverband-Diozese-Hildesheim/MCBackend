import winston from "winston";
const {combine, timestamp, simple, colorize} = winston.format;

const logger = winston.createLogger({
  format: combine(
      timestamp(),
      simple(),
      colorize({all: true}),
  ),
  transports: new winston.transports.Console({name: "console", colorize: true, showLevel: true, formatter: winston.consoleFormatter}),
});

if (process.env.NODE_ENV) {
  if (!process.env.NODE_ENV.localeCompare("test")) logger.silent = true;
}

export default logger;
