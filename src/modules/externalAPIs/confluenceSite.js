import apiUse from "./genericAPIUse";
import configuration from "../configuration";
import confluenceSiteScheme from "../../model/confluenceSite";


/** Module to handle creation, modification, files uploads and deletion of confluence sites
* @module modules/externalAPIs/confluenceSite
*/

const callApiFunction = ({ apiMethod = "get", apiEndpoint = "", apiPostData = {} } = {}) => {
  return new Promise((resolve, reject) => {
    apiUse.use({
      method: apiMethod,
      url: `${configuration.DMSUrl}${apiEndpoint}`,
      headers: { "Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64") },
      body: apiPostData
    })
      .then((result) => {
        resolve(result);
      });
  })
}


const createSiteFunction = ({ titleName = "Platzhalter-Titel", parentID = 0, spaceKey = "PROT", content = `Lorem ipsum dolor sit amet.` } = {}) => {
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

  if (!parentID == 0) {
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
        return callApiFunction({ apiMethod: "post", apiEndpoint: "/rest/api/content", apiPostData: postData });
      })
      .then((result) => {
        let message = {
          userNotification: result.data.message,
          apiPayload: { link: "error", title: "error", ...result.data }
        }
        if (result.statusCode == 200) {
          message = {
            userNotification: `Your site is created. URL: <a href="${result.data._links.base}${result.data._links.webui}">${result.data._links.base}${result.data._links.webui}</a>`,
            apiPayload: { link: `${result.data._links.base}${result.data._links.webui}`, title: result.data.title }
          }
        }
        resolve({ statusCode: result.statusCode, data: message });
      })
  })
}

const updateSiteFunction = ({ titleName = "Platzhalter-Titel", id = "", versionNumber = 0, content = "updated" } = {}) => {
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
    readSiteFunction({ id: "153747457" })
      .then((result) => {
        if (result.statusCode == 200) {
          postData = {
            ...postData,
            version: {
              number: result.data.apiPayload.version.number + 1
            }
          }
          return callApiFunction({ apiMethod: "put", apiEndpoint: `/rest/api/content/${id}`, apiPostData: postData });
        }
        else {
          return new Promise((resolve, reject) => {
            resolve(result);
          });
        }
      })
      .then((result) => {
        let message = {
          userNotification: result.data.message,
          apiPayload: { link: "error", title: "error", ...result.data }
        }
        if (result.statusCode == 200) {
          message = {
            userNotification: `Your site is updated. URL: <a href="${result.data._links.base}${result.data._links.webui}">${result.data._links.base}${result.data._links.webui}</a>`,
            apiPayload: { link: `${result.data._links.base}${result.data._links.webui}`, title: result.data.title }
          }
        }
        resolve({ statusCode: result.statusCode, data: message });
      })
  })
}

const readSiteFunction = ({ id = "152141923" } = {}) => {
  return new Promise((resolve, reject) => {
    callApiFunction({ apiMethod: "get", apiEndpoint: `/rest/api/content/${id}` })
      .then((result) => {
        let message = {
          userNotification: result.data.message,
          apiPayload: { id: "error", title: "error", type: "error", ...result.data }
        }
        if (result.statusCode == 200) {
          message = {
            userNotification: `here is your site data: <pre><code>${JSON.stringify(result.data, undefined, 4)}</code></pre>`,
            apiPayload: result.data
          }
        }
        resolve({ statusCode: result.statusCode, data: message });
      })
  })
}


const deleteSiteFunction = ({ id = "152141923" } = {}) => {
  return new Promise((resolve, reject) => {
    callApiFunction({ apiMethod: "delete", apiEndpoint: `/rest/api/content/${id}` })
      .then((result) => {
        let message = {
          userNotification: result.data.message,
          apiPayload: { id: "error", title: "error", type: "error", ...result.data }
        }
        if (result.statusCode == 204) {
          message = {
            userNotification: `the site was deleted`,
            apiPayload: {}
          }
        }
        resolve({ statusCode: result.statusCode, data: message });
      })
  })
}

export default {
  createSite: createSiteFunction,
  readSite: readSiteFunction,
  updateSite: updateSiteFunction,
  deleteSite: deleteSiteFunction
};
