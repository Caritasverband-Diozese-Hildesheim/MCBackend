import axios from "axios";
import logger from "./logger";
/** Module to handle generic API request for GET and POST
* @module modules/externalAPIs/gnericAPIUse
*/


/**
* @typedef {Object} useApi
* @property {function} get calls an API over GET request and calls back the function you must provide
* @property {function} post calls an API over POST request, sends body data and calls back the function you must provide
*/

export default {
  get:
  /**
    * @function get
    * @description calls an API over GET request and calls back the function you must provide
    * @param url URL to call
    * @param headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
    * @param cb function to calls back
    * @return nothing. Just calls cb
    */
  (url, headers, cb) => {
    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    })
        .then((response) =>{
          cb(response.status, response.data);
        })
        .catch((error) =>{
          logger.info("API Call " + url + " failed with status: " + error.response.status + " and with message: " + error.response.data);
          cb(error.response.status, error.response.data);
        })
        .finally(() => {
          // always executed
        });
    return;
  },


  post:
  /**
    * @function post
    * @description calls an API over POST request, sends body data and calls back the function you must provide
    * @param url URL to call
    * @param headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
    * @param body json data to post to the API
    * @param cb function to calls back
    * @return nothing. Just calls cb
    */
  (url, headers, body, cb) => {
    axios.post(url, body, {
      headers: {
        ...headers,
      },
    })
        .then((response) =>{
          cb(response.status, response.data);
        })
        .catch((error) =>{
          console.log(error);
          logger.info("API Call " + url + " failed with status: " + error.response.status + " and with message: " + JSON.stringify(error.response.data));
          cb(error.response.status, error.response.data);
        })
        .finally(() => {
          // always executed
        });
    return;
  },
};
