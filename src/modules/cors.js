/** Datamodel to handle [CORS]{@link https://developer.mozilla.org/de/docs/Web/HTTP/CORS}
* @module modules/cors
*/
export default corsOptions;
/**
* @typedef {Object} corsOptions
* @property {array} origin which origin does have access
* @property {number} optionsSuccessStatus which status to be send with success
* @property {boolean} credentials are credentials needed
*/
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"],
  optionsSuccessStatus: 200,
  credentials: true,
};
