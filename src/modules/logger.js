const { createLogger, format, transports } = require('winston');
const { combine, timestamp, simple, colorize } = format;
 
const logger = createLogger({
  format: combine(
    
    timestamp(),
    simple(),
    colorize({all: true})
  ),
  transports: [new transports.Console()]
})
export default logger;