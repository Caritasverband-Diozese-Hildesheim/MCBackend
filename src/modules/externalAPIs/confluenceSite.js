import apiUse from "./genericAPIUse";
import configuration from "../configuration";
import confluenceSiteScheme from "../../datamodel/confluenceSite";
import * as yup from "yup";


/** Module to handle creation, modification, files uploads and deletion of confluence sites
* @module modules/externalAPIs/confluenceSite
*/

/**
* @function callApiFunction
* @description Preparation to call the Confluence API. So you don't have to copy&paste it all over the place
* @param {String} apiMethod Request method to use
* @param {String} apiEndpoint Which Confluence API-Endpoint to call
* @param {Object} apiPostData Data to send to the Confluence API-Endpoint
* @return {Promise} always returns a solved Promise.
*/
const callApiFunction = ({apiMethod = "get", apiEndpoint = "", apiPostData = {}, headers = {}} = {}) => {
  return new Promise((resolve, reject) => {
    apiUse.use({
      method: apiMethod,
      url: `${configuration.DMSUrl}${apiEndpoint}`,
      headers: {"Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64"), ...headers},
      body: apiPostData,
    })
        .then((result) => {
          resolve(result);
        });
  });
};

/**
* @function createSiteFunction
* @description creates a Content-Type of "page" in Confluence
* @param {String} titleName The title for the page
* @param {String} parentID has the page a parent site? ID goes of the parent site here
* @param {string} spaceKey in which space should the site be created in
* @param {string} content the actual content of the page in representation-form "wiki"
* @return {Promise} always returns a solved Promise.
*/
const createSiteFunction = ({titleName = "Platzhalter-Titel", parentID = "", spaceKey = "PROT", content = "Lorem ipsum dolor sit amet."} = {}) => {
  let postData = {
    title: titleName,
    type: "page",
    status: "current",
    space: {
      key: spaceKey,
    },
    body: {
      wiki: {
        value: content,
        representation: "wiki",
      },
    },
  };

  if (!parentID === "") {
    postData = {
      ...postData,
      ancestors: [{
        id: parentID,
      }],
    };
  }

  return new Promise((resolve, reject) => {
    confluenceSiteScheme.createContentScheme.validate(postData)
        .then(() => {
          return callApiFunction({apiMethod: "post", apiEndpoint: "/rest/api/content", apiPostData: postData});
        })
        .then((result) => {
          let message = {
            userNotification: result.data.message,
            apiPayload: {link: "error", title: "error", ...result.data},
          };
          if (result.statusCode == 200) {
            message = {
              userNotification: `Your site is created. URL: <a href="${result.data._links.base}${result.data._links.webui}">${result.data._links.base}${result.data._links.webui}</a>`,
              apiPayload: {link: `${result.data._links.base}${result.data._links.webui}`, title: result.data.title},
            };
          }
          resolve({statusCode: result.statusCode, data: message});
        });
  });
};

/**
* @function updateSiteFunction
* @description Updates the content of a Content-Type of "page" in Confluence
* @param {String} titleName The title for the page
* @param {String} id the number that specifies the to be updated site
* @param {string} content the actual content of the page in representation-form "wiki"
* @return {Promise} always returns a solved Promise.
*/
const updateSiteFunction = ({titleName = "Platzhalter-Titel", id = "", content = "updated"} = {}) => {
  let postData = {
    title: titleName,
    type: "page",
    status: "current",
    body: {
      wiki: {
        value: content,
        representation: "wiki",
      },
    },
  };
  return new Promise((resolve, reject) => {
    readSiteFunction({id: id})
        .then((result) => {
          if (result.statusCode == 200) {
            postData = {
              ...postData,
              version: {
                number: result.data.apiPayload.version.number + 1,
              },
            };
            return callApiFunction({apiMethod: "put", apiEndpoint: `/rest/api/content/${id}`, apiPostData: postData});
          } else {
            return new Promise((resolve, reject) => {
              resolve(result);
            });
          }
        })
        .then((result) => {
          let message = {
            userNotification: result.data.message,
            apiPayload: {link: "error", title: "error", ...result.data},
          };
          if (result.statusCode == 200) {
            message = {
              userNotification: `Your site is updated. URL: <a href="${result.data._links.base}${result.data._links.webui}">${result.data._links.base}${result.data._links.webui}</a>`,
              apiPayload: {link: `${result.data._links.base}${result.data._links.webui}`, title: result.data.title},
            };
          }
          resolve({statusCode: result.statusCode, data: message});
        });
  });
};

/**
* @function readsSiteFunction
* @description reads the content of a Content-Type of "page" in Confluence
* @param {String} id the number that specifies the to be read site
* @return {Promise} always returns a solved Promise.
*/
const readSiteFunction = ({id = ""} = {}) => {
  return new Promise((resolve, reject) => {
    callApiFunction({apiMethod: "get", apiEndpoint: `/rest/api/content/${id}?expand=body.editor`})
        .then((result) => {
          let message = {
            userNotification: result.data.message,
            apiPayload: {id: "error", title: "error", type: "error", ...result.data},
          };
          if (result.statusCode == 200) {
            message = {
              userNotification: `here is your site data: <pre><code>${JSON.stringify(result.data, undefined, 4)}</code></pre>`,
              apiPayload: result.data,
            };
          }
          resolve({statusCode: result.statusCode, data: message});
        });
  });
};


/**
* @function deleteSiteFunction
* @description deletes a Content-Type of "page" in Confluence
* @param {String} id the number that specifies the to be deleted site
* @return {Promise} always returns a solved Promise.
*/
const deleteSiteFunction = ({id = ""} = {}) => {
  return new Promise((resolve, reject) => {
    callApiFunction({apiMethod: "delete", apiEndpoint: `/rest/api/content/${id}`})
        .then((result) => {
          let message = {
            userNotification: result.data.message,
            apiPayload: {id: "error", title: "error", type: "error", ...result.data},
          };
          if (result.statusCode == 204) {
            message = {
              userNotification: "the site was deleted",
              apiPayload: {},
            };
          }
          resolve({statusCode: result.statusCode, data: message});
        });
  });
};
0;
/**
* @function getAllAttachments
* @description get  a list (not the files itself) of files of  a Content-Type of "page" in Confluence
* @param {String} id the number that specifies the to be deleted site
* @return {Promise} always returns a solved Promise.
*/
const getAllAtachments = ({id = ""} = {}) => {
  return new Promise((resolve, reject) => {
    const schema = yup.number().required().positive().integer();
    schema.validate(id)
        .then(() => {
          return callApiFunction({apiMethod: "get", apiEndpoint: `/rest/api/content/${id}/child/attachment`})
              .then((result) => {
                let message = {
                  userNotification: result.data.message,
                  apiPayload: {id: "error", title: "error", type: "error", ...result.data},
                };
                if (result.statusCode == 200) {
                  message = {
                    userNotification: `here is your site data: <pre><code>${JSON.stringify(result.data, undefined, 4)}</code></pre>`,
                    apiPayload: result.data,
                  };
                }
                resolve({statusCode: result.statusCode, data: message});
              });
        });
  });
};

/**
* @function postSiteFunction
* @description adds a file to a Content-Type of "page" in Confluence
* @param {String} id the number that specifies the to be deleted site
* @param {Object} formData the file in multipart/form-data
* @param {String} formBoundaries a specific string, that is generated by FormData._boundary. See [Boundary]{@link https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.2}
* @return {Promise} always returns a solved Promise.
*/
const postAttachments = ({id = "", formData, formBoundaries} = {}) => {
  return new Promise((resolve, reject) => {
    const schema = yup.number().required().positive().integer();
    schema.validate(id)
        .then(() => {
          return callApiFunction({
            apiMethod: "post",
            apiEndpoint: `/rest/api/content/${id}/child/attachment`,
            apiPostData: formData,
            headers: {
              "X-Atlassian-Token": "nocheck",
              "Content-Type": `multipart/form-data; boundary=${formBoundaries}`,
            },
          })
              .then((result) => {
                let message = {
                  userNotification: result.data.message,
                  apiPayload: {id: "error", title: "error", type: "error", ...result.data},
                };
                if (result.statusCode == 200) {
                  message = {
                    userNotification: `here is your site data: <pre><code>${JSON.stringify(result.data, undefined, 4)}</code></pre>`,
                    apiPayload: result.data,
                  };
                }
                resolve({statusCode: result.statusCode, data: message});
              });
        });
  });
};

export default {
  createSite: createSiteFunction,
  readSite: readSiteFunction,
  updateSite: updateSiteFunction,
  deleteSite: deleteSiteFunction,
  getAttachments: getAllAtachments,
  postAttachments: postAttachments,
};
