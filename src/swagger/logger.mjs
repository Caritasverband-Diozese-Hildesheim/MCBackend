import winston from "winston";
const {combine, timestamp, simple, colorize} = winston.format;

const logger = winston.createLogger({
  format: combine(

      timestamp(),
      simple(),
      colorize({all: true}),
  ),
  transports: [new winston.transports.Console()],
});
export default logger;
