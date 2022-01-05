import axios from "axios";
import logger from "../logger";
/** Module to handle generic API request for GET and POST
* @module modules/externalAPIs/gnericAPIUse
*/


/**
* @typedef {Object} useApi
* @property {function} get calls an API over GET request.
* @property {function} post calls an API over POST request, sends body data.
* @property {function} put calls an API over PUT request, sends body data.
* @property {function} delete calls an API over DELETE request.
*/

const jsonHeader = {"Content-Type": "application/json; charset=utf-8"};

/**
* @function getFunction
* @description calls an API over GET request.
* @param {String} url URL to call
* @param {Object} headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
* @property {String[]} headers.array Array of strings to define HTTP headers
* @return {Promise} always returns a solved Promise.
*/
const getFunction = ({url="", headers={}}={}) => {
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
* @function deleteFunction
* @description calls an API over DELETE request.
* @param {String} url URL to call
* @param {Object} headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
* @property {String[]} headers.array Array of strings to define HTTP headers
* @return {Promise} always returns a solved Promise.
*/
const deleteFunction = ({url="", headers={}}) => {
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
* @description calls an API over GET request, sends body data.
* @param {String} url URL to call
* @param {Object} headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
* @property {String[]} headers.array Array of strings to define HTTP headers
* @param {String} body JSON
* @return {Promise} always returns a solved Promise.
*/
const postFunction = ({url="", headers={}, body={}}={}) => {
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
};

/**
* @function put
* @description calls an API over PUT request.
* @param {String} url URL to call
* @param {Object} headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
* @property {String[]} headers.array Array of strings to define HTTP headers
* @param {Object} body data that will be send.
* @return {Promise} always returns a solved Promise.
*/
const putFunction = ({url, headers={}, body={}}={}) => {
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
};

/**
* @function get
* @description calls an API over GET request
* @param {String} url URL to call
* @param {Object} headers extra header to set - like bearer or other auths - Content-Type is always set to aspplication/json
* @property {String[]} headers.array Array of strings to define HTTP headers
* @return {Promise} always returns a solved Promise.
* @throws {Object} error, if wrong method is used
*/
const useFunction = ({method ="get", url="", headers={}, body={}}={}) =>{
  return new Promise((resolve, reject) => {
    switch (method) {
      case "get":
        getFunction({url: url, headers: {...headers}})
            .then((result) =>{
              resolve(result);
            });
        break;
      case "post":
        postFunction({url: url, headers: {...headers}, body: body})
            .then((result) =>{
              resolve(result);
            });
        break;
      case "put":
        putFunction({url: url, headers: {...headers}, body: body})
            .then((result) =>{
              resolve(result);
            });
        break;
      case "delete":
        deleteFunction({url: url, headers: {...headers}, body: body})
            .then((result) =>{
              resolve(result);
            });
        break;
      default:
        logger.error(`Method ${method} is not used`);
        throw new Error(`Method ${method} is not used`);
    }
  });
};

export default {
  get: getFunction,
  post: postFunction,
  put: putFunction,
  delete: deleteFunction,
  use: useFunction,
};
