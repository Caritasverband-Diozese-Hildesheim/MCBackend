import axios from "axios";
import logger from "../logger";
/** Module to handle generic API request for GET and POST
* @module modules/externalAPIs/gnericAPIUse
*/


/**
* @typedef {Object} useApi
* @property {function} get calls an API over GET request and calls back the function you must provide
* @property {function} post calls an API over POST request, sends body data and calls back the function you must provide
*/

const jsonHeader = {"Content-Type": "application/json; charset=utf-8"}
const nodeEnv = process.env.NODE_ENV.toString();
/**
      * @function get
      * @description calls an API over GET request and calls back the function you must provide
      * @param url URL to call
      * @param headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
      * @param cb function to calls back
      * @return nothing. Just calls cb
      */
const getFunction = (url, headers) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {headers: {...jsonHeader, ...headers}})
        .then((response) => {
          resolve({statusCode: response.status, data: response.data});
        })
        .catch((error) => {
          if (error.response) {
            logger.warn(`API Call ${url} failed with status: ${error.response.status} and with message: ${JSON.stringify(error.response.data)}`);
            resolve({statusCode: error.response.status, data: error.response.data});
          } else {
            logger.warn(`API Call ${url} failed with status: ${error.message}`);
            resolve({statusCode: 500, data: error.message});
          }
        });
  });
};

/**
      * @function delete
      * @description calls an API over GET request and calls back the function you must provide
      * @param url URL to call
      * @param headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
      * @param cb function to calls back
      * @return nothing. Just calls cb
      */
 const deleteFunction = (url, headers) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, {headers: {...jsonHeader, ...headers}})
        .then((response) => {
          resolve({statusCode: response.status, data: response.data});
        })
        .catch((error) => {
          if (error.response) {
            logger.warn(`API Call ${url} failed with status: ${error.response.status} and with message: ${JSON.stringify(error.response.data)}`);
            resolve({statusCode: error.response.status, data: error.response.data});
          } else {
            logger.warn(`API Call ${url} failed with status: ${error.message}`);
            resolve({statusCode: 500, data: error.message});
          }
        });
  });
};
/**
      * @function post
      * @description calls an API over POST request, sends body data and calls back the function you must provide
      * @param url URL to call
      * @param headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
      * @param body json data to post to the API
      * @return nothing. Just calls cb
      */
const postFunction = (url, headers, body) => {
  return new Promise((resolve, reject) => {
    axios.post(url, body, {headers: {...jsonHeader, ...headers}})
        .then((response) => {
          resolve({statusCode: response.status, data: response.data});
        })
        .catch((error) => {
          if (error.response) {
            logger.warn(`API Call ${url} failed with status: ${error.response.status} and with message: ${JSON.stringify(error.response.data)}`);
            resolve({statusCode: error.response.status, data: error.response.data});
          } else {
            logger.warn(`API Call ${url} failed with status: ${error.message}`);
            resolve({statusCode: 500, data: error.message});
          }
        });
  });
}

/**
      * @function put
      * @description calls an API over POST request, sends body data and calls back the function you must provide
      * @param url URL to call
      * @param headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
      * @param body json data to post to the API
      * @return nothing. Just calls cb
      */
 const putFunction = (url, headers, body) => {
  return new Promise((resolve, reject) => {
    axios.put(url, body, {headers: {...jsonHeader, ...headers}})
        .then((response) => {
          resolve({statusCode: response.status, data: response.data});
        })
        .catch((error) => {
          if (error.response) {
            logger.warn(`API Call ${url} failed with status: ${error.response.status} and with message: ${JSON.stringify(error.response.data)}`);
            resolve({statusCode: error.response.status, data: error.response.data});
          } else {
            logger.warn(`API Call ${url} failed with status: ${error.message}`);
            resolve({statusCode: 500, data: error.message});
          }
        });
  });
}
const useFunction = ({method ="get", url="", headers="", body=""}={}) =>{
  return new Promise((resolve, reject) => {
    switch (method){
      case "get": 
        getFunction(url, headers)
        .then ((result) =>{
            resolve(result);
        })
      break;
      case "post": 
      postFunction(url, headers, body)
      .then ((result) =>{
          resolve(result);
      })
      break;
      case "put": 
      putFunction(url, headers, body)
      .then ((result) =>{
          resolve(result);
      })
      break;
      case "delete": 
      deleteFunction(url, headers, body)
      .then ((result) =>{
          resolve(result);
      })
      break;
      default:
        logger.error(`Method ${method} is not used`);
        reject();
    }
  })
}

export default {
  get: getFunction,
  post: postFunction,
  put: putFunction,
  delete: deleteFunction,
  use: useFunction
};
